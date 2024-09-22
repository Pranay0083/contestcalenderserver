import db from '../../db/index.js';

const addUserToDb = async (chatId, mail) => {
    let connection;
    try {
        connection = await db.connect();
        const { rows: statusUser } = await connection.query("SELECT * FROM \"user\" WHERE mail = $1", [mail]);
        
        console.log(statusUser);
        
        if (statusUser.length === 0) {
            return { err: "User does not exist" };
        }

        await connection.query(
            "INSERT INTO userNotificationInfo (user_id, telegram) VALUES ($1, $2)",
            [statusUser[0].id, chatId]
        );

        return { success: "User registered successfully for Telegram notifications" };
    } catch (err) {
        console.error("Error registering user for Telegram notifications:", err);
        return { err: "Error registering user for Telegram notifications" };
    } finally {
        if (connection) {
            connection.release(); // Always release the connection
        }
    }
};

export default addUserToDb;
