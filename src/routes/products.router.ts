import { Request, Response, Router } from "express";
import { client, pool } from "../db";

// export type Product = {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
// };

export const productsRouter = Router({ mergeParams: true });
// api/v1/cart/:cartId/products
productsRouter.get("/", async (req: Request, res: Response) => {
    const cartId = +req.params.cartId;

    const data = await pool.query(`
        SELECT * FROM cart WHERE id = $1;
        `, [cartId]);
    const cart = data.rows[0];
    if (!cart) {
        res.status(404).json({ error: 404, message: `id: ${cartId} does not exist` })
    }

    try {
        const data = await pool.query(`SELECT * FROM products WHERE cart_id = $1;`, [cartId]);
        res.json(data.rows);
    } catch (err) {
        console.log(err);
        res.json({ meesage: err })
    }
})

productsRouter.get("/:productId", async (req: Request, res: Response) => {
    const { cartId, productId } = req.params;

    const data = await pool.query(`
        SELECT * FROM products WHERE id = $1;
        `, [cartId]);

    const cart = data.rows[0];
    if (!cart) {
        res.status(404).json({ error: 404, message: `id:${cartId} does not exist` })
    }

    const productdata = await pool.query(`
        SELECT * FROM products WHERE id = $1 AND cart_id = $2;
        `, [productId, cartId]);

    const product = productdata.rows[0];

    if (!product) {
        res.status(404).json({ error: 404, message: `Product id: ${productId} does not exist` });
        return;
    }

    res.json(product);
})

productsRouter.post(("/"), async (req: Request, res: Response) => {
    const cartId = req.params.cartId;
    const { name, price, order_quantity} = req.body;

    const data = await pool.query(`
        INSERT INTO products (cart_id, name, price, order_quantity) VALUES ($1, $2, $3, $4) RETURNING *;
        `, [cartId, name, price, order_quantity]
    );

    res.status(201).json(data.rows[0]);
})

productsRouter.put(("/:productId"), async (req: Request, res: Response) => {
    const { cartId, productId } = req.params;
    const cartData = await pool.query(`
        SELECT * FROM cart WHERE id = $1;
        `, [cartId]);

    const cart = cartData.rows[0];

    if (!cart) {
        res.status(404).json({ error: 404, message: `Record with id ${cartId} does not exist.` });
    }

    const { name, price, order_quantity } = req.body;

    const updated = await pool.query(`
        UPDATE products
        SET name = $1, price = $2, order_quantity = $3
        WHERE id = $4 AND cart_id = $5
        RETURNING *
        `, [name, price, order_quantity, productId, cartId]);

    res.json(updated.rows[0]);
})

productsRouter.delete(("/:productId"), async (req: Request, res: Response) => {
    const { cartId, productId } = req.params;

    const data = await pool.query(`
        SELECT * FROM cart WHERE id = $1;
        `, [cartId]);
    const cart = data.rows[0];

    if (!cart) {
        res.status(404).json({ error: 404, message: `Record with id ${cartId} does not exist.` });
        return;
    }

    const deleted = await pool.query(`
        DELETE FROM products WHERE id = $1 AND cart_id = $2 RETURNING *
        `, [productId, cartId]);

    // if (deleted.rows.length > 1) {
    //     await client.query("ROLLBACK");

    //     res.status(500).json({
    //         error: 500,
    //         message: `something went wrong while deleting the task with id ${productId}`
    //     });
    //     return;
    // }

    // await client.query("COMMIT");

    res.json(deleted.rows[0]);
});