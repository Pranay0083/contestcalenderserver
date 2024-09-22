import sendMessage from '../../bot/functions/sendTelegramMsg.js';
import pool from '../../db/index.js';

export default {
    method: 'post',
    url: '/notifyUser',
    func: async (req, res) => {
        try {
            const { userId, message, time } = req.body;
            const client = await pool.connect();
            try {
                const { rows: statusUser } = await client.query("SELECT * FROM userNotificationInfo WHERE user_id = $1", [userId]);
                if (statusUser.length === 0 || statusUser[0].telegram == null) {
                    return res.json({ err: "Register on telegram first" });
                }
                res.status(200).json({ message: 'Notification scheduled' });

                setTimeout(async () => {
                    try {
                        const result = await sendMessage(userId, message);
                        console.log(result);
                    } catch (error) {
                        console.error(`Error sending message: ${error.message}`);
                    }
                }, time);
            } finally {
                client.release();
            }
        } catch (error) {
            console.error(`Error handling request: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    }
};
