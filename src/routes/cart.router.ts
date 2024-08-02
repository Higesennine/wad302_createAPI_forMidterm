import { Router, Request, Response } from "express";

export const cartRouter = Router();

cartRouter.get(("/"),(req: Request, res: Response) => {
    res.json();
})

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