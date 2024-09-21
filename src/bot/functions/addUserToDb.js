import db from '../../db/index.js';

const addUserToDb = async (chatId, mail) => {
    try {
        const connection = await db.getConnection();
        const [statusUser] = await connection.query("SELECT * FROM user WHERE mail = ?", [mail]);
        console.log(statusUser);
        if (statusUser.length === 0) {
            return { err: "user does not exist" };
        }
        await connection.query(
            "INSERT INTO userNotificationInfo (user_id, telegram, email) VALUES (?, ?, ?)",
            [statusUser[0].id, chatId, mail]
        );
        return { success: "User registered successfully for telegram notifications" };
    } catch (err) {
        return { err: "Error registering user for telegram notifications" };
    }
};

export default addUserToDb;