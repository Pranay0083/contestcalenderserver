import db from '../../db/index.js';
import bcrypt from 'bcrypt';

export default ({
    method: 'post',
    url: '/signin',
    func: async (req, res) => {
        if (req.body.mail && req.body.password) {
            try {
                const connection = await db.getConnection();
                const [rows] = await connection.query(
                    `SELECT * FROM user WHERE mail = ?`,
                    [req.body.mail]
                );
                if (rows.length > 0) {
                    const user = rows[0];
                    const match = await bcrypt.compare(req.body.password, user.password);
                    if (match) {
                        res.send({success: "User logged in successfully", token: user.id});
                    } else {
                        res.send({err: "Invalid credentials"});
                    }
                } else {
                    res.send({err: "Invalid credentials"});
                }
                connection.release();
            } catch (err) {
                console.error(`Error logging in user: ${err}`);
                res.send({err: "Error logging in user"});
            }
        } else {
            res.send({err: "Missing required fields"});
        }
    }
})