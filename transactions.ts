//transactions are used when we are inserting data on two tables simultanously ..so if one transaction is failed the other also fails and the process is rollbacked 


async function insertUserAndAddress(
    username : string,
    email : string,
    password : string,
    user_id : number,
    city : string,
    country : string,
    street : string,
    pincode : string
) {
    try {
        await client.connect();
        // start transaction >>
        await client.query('BEGIN'); //in the below line the returning id returns the id when the new user is created 
        const insertUserText = `
            INSERT INTO users(username , email , password)
            VALUES ($1,$2,$3)
            RETURNING id;
        `;
        const userValues = [username , email , password];
        const userRes = await client.query(insertUserText,userValues);
        const userID = userRes.rows[0].id;

        //inserting address using the returned user id  >>
        const insertAdressText = `
            INSERT INTO addresses (user_id,city,country,street,pincode)
            VALUES ($1,$2,$3,$4,$5);
        `;
        const adressValues = [user_id , city , country , street , pincode];
        const adressRes = await client.query(insertAdressText,adressValues);

        //commit transaction >>
        await client.query('COMMIT');

        console.log("User and address inserted successfully!!!");
    } catch(err) {
        await client.query('ROLLBACK') //rollback the transaction on error .
        console.error('Error while inserting data , rolled back ' , err);
        throw err;
    } finally {
        await client.end();
    }
}

insertUserAndAddress(
    'sukanya ghosh',
    'sukanya@gmail.com',
    'sukanya12345',
    3,
    'kolkata',
    'India',
    'Sovabazar',
    '700123'
);
