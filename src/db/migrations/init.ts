import { client } from "..";


const run = async () => {
    try {
        await client.connect();

        await client.query(`
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
            `);

        console.log(`table is generated`);
        console.log(`testing... if we can send query`);

        const data = await client.query(`SELECT * FROM products;`);

        console.log(`currently the project in database is ${JSON.stringify(data.rows)}`);

        console.log(`Successfully the table is generated and confirmed!`);
    } catch (err) {
        console.error(`Oh no... something has gone wrong see the error: ${JSON.stringify(err)}`);
    }
};

run().then(() => client.end());