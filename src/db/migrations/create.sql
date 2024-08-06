DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS cart CASCADE;

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    item_quantity INTEGER
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES cart(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    order_quantity INTEGER NOT NULL
);