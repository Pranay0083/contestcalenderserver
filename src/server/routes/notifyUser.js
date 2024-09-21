import sendMessage from '../../bot/functions/sendTelegramMsg.js';
import db from '../../db/index.js'

export default ({
    method: 'post',
    url: '/notifyUser',
    func: async (req, res) => {
        try {
            const { userId, message, time } = req.body;
            const connection = await db.getConnection();
            const [statusUser] = await connection.query("SELECT * FROM userNotificationInfo WHERE user_id = ?", [userId]);
            if(statusUser.length == 0 || statusUser[0].telegram == null){
                return res.json({
                    err: "Register on telegram first"
                })
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

            return;
        } catch (error) {
            res.status(500).json({ error: error.message });
            return;
        }
    }
});