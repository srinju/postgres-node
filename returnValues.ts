


import { Client } from "pg";


async function getUser(email : string) {
    const client  = new Client({
        connectionString : 'postgresql://test0_owner:N8pvHAc9Lxmh@ep-tiny-surf-a54z1rkp.us-east-2.aws.neon.tech/test0?sslmode=require'
    });

    try {
        await client.connect();
        const insertquery = "SELECT * FROM users WHERE email=$1" //select the first element in the coloumn of email
        const values = [email];
        const result = await client.query(insertquery,values);

        if(result.rows.length > 0) {
            console.log('User found ' , result.rows[0]);  //output user data gives the first data on the same email it is there
            return result.rows[0];
        } else {
            console.log('no user found with the given email');
            return null;
        }
    } catch(err) {
        console.log('Error while fetching User : ',  err);
        throw err;  
    } finally {
        await client.end(); //close the client connection 
    }
}

getUser('janshi333@gmail.com').catch(console.error);
