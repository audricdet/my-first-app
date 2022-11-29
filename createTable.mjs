import pkg from 'pg';

const {
    Client
} = pkg;

// Client est le pont entre mon code et ma database

const client = new Client({
    user: 'audricdetrez',
    host: 'localhost',
    database: 'my_first_app',
    password: process.env.DATABASE_PWD,
    port: 5432,
});

// Connection a la database 

client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
});

// Create table

const createTable = `
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "ip" VARCHAR(50) NOT NULL
);`

client.query(createTable, (err, res) => {
    if (err) throw err
    console.log(res)
    client.end()
})