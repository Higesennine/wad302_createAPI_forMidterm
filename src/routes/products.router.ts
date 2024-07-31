import { Request, Response, Router } from "express";

const router = Router();

router.get(("/"),(req: Request, res: Response) => {
    res.json();
})

router.get(("/:id"),(req: Request, res: Response) => {
    res.json();
})

router.post(("/"),(req: Request, res: Response) => {
    res.json();
})

router.put(("/:id"),(req: Request, res: Response) => {
    res.json();
})

router.delete(("/:id"),(req: Request, res: Response) => {
    res.json();
})