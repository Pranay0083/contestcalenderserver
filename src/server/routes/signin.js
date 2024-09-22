import pool from '../../db/index.js';
import bcrypt from 'bcrypt';

export default {
    method: 'post',
    url: '/signin',
    func: async (req, res) => {
        if (req.body.mail && req.body.password) {
            const client = await pool.connect();
            try {
                const result = await client.query(
                    'SELECT * FROM "user" WHERE mail = $1',
                    [req.body.mail]
                );
                
                if (result.rows.length > 0) {
                    const user = result.rows[0];
                    const match = await bcrypt.compare(req.body.password, user.password);
                    if (match) {
                        res.send({success: "User logged in successfully", token: user.id});
                    } else {
                        res.send({err: "Invalid credentials"});
                    }
                } else {
                    res.send({err: "Invalid credentials"});
                }
            } catch (err) {
                console.error(`Error logging in user: ${err}`);
                res.send({err: "Error logging in user"});
            } finally {
                client.release();
            }
        } else {
            res.send({err: "Missing required fields"});
        }
    }
};