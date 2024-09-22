import pool from '../../db/index.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default {
    method: 'post',
    url: '/signup',
    func: async (req, res) => {
        console.log(req.body);
        if (req.body.username && req.body.mail && req.body.password) {
            const client = await pool.connect();
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const id = uuidv4();
                
                const result = await client.query(
                    'INSERT INTO "user" (id, username, mail, password) VALUES ($1, $2, $3, $4) RETURNING id',
                    [id, req.body.username, req.body.mail, hashedPassword]
                );
                
                res.send({success: "User created successfully", token: id});
            } catch (err) {
                console.error(`Error creating user: ${err}`);
                if (err.code === '23505') {  // unique_violation error code
                    res.send({err: "Username or email already exists"});
                } else {
                    res.send({err: "Error creating user"});
                }
            } finally {
                client.release();
            }
        } else {
            res.send({err: "Missing required fields"});
        }
    }
};