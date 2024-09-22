// import sql from 'mysql2/promise';
// import dotenv from 'dotenv';
// dotenv.config();

// const config = {
//     host: process.env.DB_PROD_HOST,
//     user: process.env.DB_PROD_USER,
//     password: process.env.DB_PROD_PASSWORD,
//     database: process.env.DB_PROD_NAME,
//     port: process.env.DB_PROD_PORT,
//     ssl: {
//         rejectUnauthorized: false
//       }    
// };

// const pool = sql.createPool(config);

// const testConnection = async () => {
//     try {
//         const connection = await pool.getConnection();
//         connection.release();
//     } catch (err) {
//         console.error(`Error connecting to the database: ${err}`);
//     }
// };

// testConnection();

// export default pool;


import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://bdramteke:m-raHGS0oJnXxa_SDHl2ng@droopy-chimera-3022.j77.aws-ap-south-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false // You might want to set this to true in production
    }
});

const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Successfully connected to CockroachDB');
        const res = await client.query('SELECT version()');
        console.log('CockroachDB version:', res.rows[0].version);
        client.release();
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
    }
};

testConnection();

export default pool;

// Call pool.end() when your application is shutting down
process.on('SIGTERM', async () => {
    await pool.end();
    console.log('Pool has ended');
    process.exit(0);
});
