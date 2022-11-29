import * as dotenv from 'dotenv'

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

// Import Users 

import { users } from './users.mjs'

users.forEach(user => {
    const text = 'INSERT INTO users(first_name, last_name, email, ip) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [ user.firstName, user.lastName, user.email, user.ip ]

// callback
    client.query(text, values, (err, res) => {
        if (err) {
        console.log(err.stack)

        } else {
        console.log(res.rows[0])
        }
    })

});


