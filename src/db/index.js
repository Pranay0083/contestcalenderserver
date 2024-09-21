import sql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

const pool = sql.createPool(config);

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        connection.release();
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
    }
};

testConnection();

export default pool;