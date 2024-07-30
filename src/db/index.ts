import { Client } from "pg";

export const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Yasuhito9696",
    database: "product_cart"
});

export const pool = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Yasuhito9696",
    database: "product_cart"
});