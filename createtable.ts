 // write a function to create a users taable in your databasse >>

import { Client } from "pg";

const client  = new Client({
    connectionString : 'postgresql://test0_owner:N8pvHAc9Lxmh@ep-tiny-surf-a54z1rkp.us-east-2.aws.neon.tech/test0?sslmode=require'
})

async function createUsersTable() {
     await client.connect();   ///we should wait for the user to connect to the database then run the query on the client 
    //creating table users >>>
    const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log(result);
}

createUsersTable();
