 // write a function to create a users taable in your databasse >>

//this is very insecure way of inserting data someone can do a sql injection if we deploy this server via http server

import { Client } from "pg";

async function insertData(username : string, email : string ,password : string) {
    const client  = new Client({
        connectionString : 'postgresql://test0_owner:N8pvHAc9Lxmh@ep-tiny-surf-a54z1rkp.us-east-2.aws.neon.tech/test0?sslmode=require'
    });

    /*
    
    try {
        await client.connect();
        co(username , email , password) VALUES ('srinjoy' , 'dassrinjoy333@gmail.com' , '12345');"
        const res = await client.query(insertQuery);
        console.log('Insertion Success : ' , res); //output inst insertQuery = "INSERT INTO USERS nsertion result
    } catch(err) {
        console.error('error during the insertion' , err);
    } finally {
        await client.end(); //close the client connection
    }
}

insertData();
    */
    

//so the secure way is that we should not put the user provided strings inside the sql string >>>

try {
    await client.connect(); //connect the client
    const insertQuery = "INSERT INTO USERS (username , email , password) VALUES ($1,$2,$3)"; //sql query avoiding sql injection
    const values = [username , email , password];
    const res = await client.query(insertQuery , values); //puttitng the values
    console.log('insertion success' , res);
    } catch(err) {
    console.error('error during insertion' , err);
    } finally {
    await client.end();
    }
}

insertData('janshi chada' , 'janshi333@gmail.com' , 'janshichada123').catch(console.error); //putting the username email and password at last 
