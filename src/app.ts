import express from "express";
import { apiRouter } from "./routes/index.router";

export const app = express();

app.use(express.json());

app.use("/api/v1", apiRouter);
