//first step

const {client} = require('./client')

async function dropTables() {
    console.log('Dropping all tables...')
    try { 
        await client.query(`
            DROP TABLE IF EXISTS cart_item;
            DROP TABLE IF EXISTS cart;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS users;
        `)
        console.log('Finished dropping tables!')
    }   catch (error) {
            console.error(error.message)
        throw error
    } 
};

async function createTables() {
    console.log('Starting to build tables...')
    try {
        await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                "isAdmin" BOOLEAN DEFAULT false,
                email VARCHAR(255),
                address VARCHAR(255)
            );
            
            CREATE TABLE products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                description TEXT NOT NULL,
                price DECIMAL NOT NULL,
                size VARCHAR(255),
                "imageURL" TEXT
            );

            CREATE TABLE cart(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL
            );

            CREATE TABLE cart_item(
                id SERIAL PRIMARY KEY,
                "cartId" INTEGER REFERENCES cart(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL,
                quantity INTEGER NOT NULL
            );

        `)
        console.log('Finished building tables!')
    } catch (error) {
        console.error(error.message)
    } throw error

}

//SEED DATA BELOW
async function createInitialUsers(){
    console.log('Starting to create users...')
    try {
        const userToCreate = [
            {
            username: 'emily0', 
            password: 'emily0',
            isAdmin: true,
            email: 'emily38@gmail.com',
            address: '123 street'
            },
            {
            username: 'xavier1', 
            password: 'xavier1',
            isAdmin: true,
            email: 'abc123@gmail.com',
            address: '345 street'
            },
            {
            username: 'austin2', 
            password: 'austin2',
            isAdmin: true,
            email: 'def456@gmail.com',
            address: '567 street'
            },
            {
            username: 'avgjoe2', 
            password: 'avgjoe2',
            isAdmin: false,
            email: 'avgavgjoe@gmail.com',
            address: '789 street'
            }
        ];
        const users = await Promise.all(
            userToCreate.map(createUser)
        )
        
        console.log('Users created:');
        console.log(users);
        console.log('Finished creating users!')

    } catch (error) {
        console.error('Error creating users.')
        throw error
    }
}