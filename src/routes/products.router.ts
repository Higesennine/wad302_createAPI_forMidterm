import { Request, Response, Router } from "express";
import { cartRouter } from "./cart.router";
import { pool } from "../db";

// export type Product = {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
// };

export const router = Router();

router.use("/:productId/cart", cartRouter)

router.get("/", async (req: Request, res: Response) => {
    try {
        const data = await pool.query(`SELECT * FROM products;`);
        res.json(data.rows);
    } catch(err) {
        console.log(err);
        res.json({meesage: err})
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    const data = await pool.query(`
        SELECT * FROM products WHERE id = $1;
        `, [id]);

        const product = data.rows[0];

    res.json(product);
})

router.post(("/"), async (req: Request, res: Response) => {
    const {name, price} = req.body;

    const data = await pool.query(`
        INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *;
        `, [name, price]
    );

    res.status(201).json(data.rows[0]);
})

router.put(("/:id"),(req: Request, res: Response) => {
    res.json();
})

router.delete(("/:id"),(req: Request, res: Response) => {
    res.json();
})