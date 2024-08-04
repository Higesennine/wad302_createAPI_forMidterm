import { Router, Request, Response } from "express";

export const cartRouter = Router();

cartRouter.get(("/"),(req: Request, res: Response) => {
    res.json();
})

//api/v1/products/:id/cart/:id
cartRouter.get(("/:id"),(req: Request, res: Response) => {
    res.json();
})

cartRouter.post(("/"),(req: Request, res: Response) => {
    res.json();
})

cartRouter.put(("/:id"),(req: Request, res: Response) => {
    res.json();
})

cartRouter.delete(("/:id"),(req: Request, res: Response) => {
    res.json();
})