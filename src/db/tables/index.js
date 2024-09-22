import pool from '../index.js';

const createTables = async () => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');

        const user = `
            CREATE TABLE IF NOT EXISTS "user" (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                username STRING UNIQUE,
                mail STRING UNIQUE,
                password STRING,
                created_at TIMESTAMP DEFAULT current_timestamp(),
                updated_at TIMESTAMP DEFAULT current_timestamp()
            )`;

        const userNotificationInfo = `
            CREATE TABLE IF NOT EXISTS userNotificationInfo (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID,
                telegram INT8,
                email STRING,
                phone_no STRING,
                instagram STRING,
                created_at TIMESTAMP DEFAULT current_timestamp(),
                updated_at TIMESTAMP DEFAULT current_timestamp(),
                FOREIGN KEY (user_id) REFERENCES "user"(id)
            )`;

        const notificationData = `
            CREATE TABLE IF NOT EXISTS notificationData (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID,
                telegram BOOLEAN NOT NULL,
                email BOOLEAN NOT NULL,
                phone_no BOOLEAN NOT NULL,
                instagram BOOLEAN NOT NULL,
                message TEXT,
                created_at TIMESTAMP DEFAULT current_timestamp(),
                updated_at TIMESTAMP DEFAULT current_timestamp(),
                FOREIGN KEY (user_id) REFERENCES "user"(id)
            )`;

        await client.query(user);
        console.log("User table created successfully");

        await client.query(userNotificationInfo);
        console.log("UserNotificationInfo table created successfully");

        await client.query(notificationData);
        console.log("NotificationData table created successfully");

        await client.query('COMMIT');
        console.log("All tables created successfully");

        return { success: "Tables created successfully" };
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(`Error: ${err}`);
        return { err: "Error creating tables" };
    } finally {
        client.release();
    }
};

export default createTables;