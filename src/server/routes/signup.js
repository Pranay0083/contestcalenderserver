import db from '../../db/index.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default({
    method: 'post',
    url: '/signup',
    func: async (req, res) => {
        console.log(req.body);
        if(req.body.username && req.body.mail && req.body.password) {
            try {
                const connection = await db.getConnection();
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const id = uuidv4();
                const [rows] = await connection.query(
                    `INSERT INTO user (id, username, mail, password) VALUES (?, ?, ?, ?)`,
                    [id, req.body.username, req.body.mail, hashedPassword]
                );
                connection.release();
                res.send({success: "User created successfully", token: id});
            } catch (err) {
                console.error(`Error creating user: ${err}`);
                res.send({err: "Error creating user"});
            }
        } else {
            res.send({err: "Missing required fields"});
        }
    }
});