


import { error } from "console";
import { Client } from "pg";


const client  =  new Client({
    connectionString : 'postgresql://test0_owner:N8pvHAc9Lxmh@ep-tiny-surf-a54z1rkp.us-east-2.aws.neon.tech/test0?sslmode=require'
});

async function joins() {
    await client.connect();

    const result = await client.query(`
        CREATE TABLE addresses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE        
        );
    `)
    console.log(result);
}

async function insertValues(user_id : number , city : string , country : string , street : string , pincode : string) {
    try{
        await client.connect();
        const insertquery = "INSERT INTO addresses(user_id , city , country , street , pincode) VALUES ($1 , $2 , $3 , $4 , $5); ";
        const values = [user_id , city , country , street , pincode];
        const result = await client.query(insertquery,values);
        console.log('Insertion success!!' , result);
    }catch(err) {
        console.log('error while inserting data ' , err);
    }finally {  
        await client.end();
    }
}

async function selectusersjoin(userId : number) {
    try {
        await client.connect();
        const insertQuery = "SELECT u.username , u.email , a.city , a.country , a.street , a.pincode FROM users u JOIN addresses a ON u.id = a.user_id WHERE u.id = $1 ;";
        const values = [userId];
        const result =  await client.query(insertQuery , values);

        if(result.rows.length > 0) {
            console.log("User found " , result.rows[0]);
            return result.rows[0];
        } else {
            console.log("user not found ");
            return null;
        }
    } catch(err) {
        console.error("error while fetching data" , err);
        throw err;
    } finally {
        await client.end();
    }
}

selectusersjoin(1);

// insertValues(1, 'New York', 'USA', '123 Broadway St', '10001').catch(console.error);
