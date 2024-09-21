import db from '../index.js';

const createTables = async () => {
    try {
        const connection = await db.getConnection();

        const user = `CREATE TABLE IF NOT EXISTS user (
            id VARCHAR(255) PRIMARY KEY,
            username VARCHAR(255) UNIQUE,
            mail VARCHAR(255) UNIQUE,
            password VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;

        const userNotificationInfo = `CREATE TABLE IF NOT EXISTS userNotificationInfo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(255),
            telegram BIGINT,
            email VARCHAR(255),
            phone_no VARCHAR(255),
            instagram VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES user(id)
        )`;

        const notificationData = `CREATE TABLE IF NOT EXISTS notificationData (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(255),
            telegram BOOLEAN NOT NULL,
            email BOOLEAN NOT NULL,
            phone_no BOOLEAN NOT NULL,
            instagram BOOLEAN NOT NULL,
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES user(id)
        )`;

        await connection.query(user);
        console.log("User table created successfully");

        await connection.query(userNotificationInfo);
        console.log("UserNotificationInfo table created successfully");

        await connection.query(notificationData);
        console.log("NotificationData table created successfully");

        connection.release();
    } catch (err) {
        console.error(`Error: ${err}`);
        return {err: "Error creating tables"};
    }
    return {success: "Tables created successfully"};
};

export default createTables;