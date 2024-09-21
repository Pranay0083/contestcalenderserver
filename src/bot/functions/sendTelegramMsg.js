import db from '../../db/index.js';
import bot from '../bot.js';

const sendMessage = async (id, message) => {
    try {
        const connection = await db.getConnection();
        connection.query("SELECT * FROM user WHERE id = ?", [id]);
        const [rows] = await connection.query("SELECT * FROM userNotificationInfo;");

        if (rows.length === 0) {
            return { err: "User not found" };
        }
        if (rows[0].telegram === null) {
            return { err: "Telegram not found" };
        }
        const chatId = rows[0].telegram;
        await bot.sendMessage(chatId, message); // Ensure you await the sendMessage call
        return { success: "Message sent successfully" };
    } catch (err) {
        console.log(`Error: ${err}`);
        return { err: "Error sending message" };
    }
}

export default sendMessage;