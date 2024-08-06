import { Router } from "express";
import { cartRouter } from "./cart.router";

export const apiRouter = Router();

const ROUTER = [{ url: "/cart", router: cartRouter }];

ROUTER.forEach(({url, router}) => {
    apiRouter.use(url, router);
})