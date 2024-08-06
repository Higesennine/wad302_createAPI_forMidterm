import { Router, Request, Response } from "express";
import { pool } from "../db";
import { productsRouter } from "./products.router";

export const cartRouter = Router();

cartRouter.use("/:cartId/products", productsRouter);

cartRouter.get(("/"), async(req: Request, res: Response) => {
    try {
        const data = await pool.query(`SELECT * FROM cart;`);
        res.json(data.rows);
    } catch(err) {
        console.log(err);
        res.json({meesage: err})
    }
})

//api/v1/cart/:cartId
cartRouter.get(("/:cartId"), async (req: Request, res: Response) => {
    const id = req.params.cartId;
    
    const data = await pool.query(`
        SELECT * FROM cart WHERE id = $1;
        `, [id])
    const cartProduct = data.rows[0];
    res.json(cartProduct);
})

cartRouter.post(("/"), async (req: Request, res: Response) => {
    const { item_quantity } = req.body;

    const data = await pool.query(`
        INSERT INTO cart (item_quantity) VALUES ($1) RETURNING *;
        `, [item_quantity])

    const updated = data.rows[0];

    res.json(updated);
})

cartRouter.put(("/:cartId"), async(req: Request, res: Response) => {
    const id = req.params.cartId;
    const cart = await pool.query(`
        SELECT * FROM cart WHERE id = $1;
        `, [id]);

    if(!cart) {
        res.status(404).json({error: 404, message: `Record with id ${id} does not exist.`});
    }

    const {item_quantity} = req.body;
    const updated = await pool.query(`
        UPDATE cart
        SET item_quantity = $1
        WHERE id = $2
        RETURNING *
        `, [item_quantity, id]);

    res.json(updated.rows[0]);
})

cartRouter.delete(("/:cartId"), async(req: Request, res: Response) => {
    const id = req.params.cartId;

    const data = await pool.query(`
        SELECT * FROM cart WHERE id = $1;
        `, [id]);
    
    const cart = data.rows[0];
    if(!cart){
        res.status(404).json({error:404, message:`id:${id} does not exist.`})
    }

    const deleted = await pool.query(`
        DELETE * FROM cart WHERE id = $1 RETURNING *;
        `, [id])
    res.json(deleted.rows[0]);
})