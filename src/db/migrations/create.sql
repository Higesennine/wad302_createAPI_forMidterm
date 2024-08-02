DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS cart CASCADE;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    order_quantity INTEGER
);