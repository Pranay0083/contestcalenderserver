import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the file URL to a directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dummyDataPath = path.resolve(__dirname, '../../data/dummyData.json');

export default ({
    method: 'get',
    url: '/getAllContest',
    func: async (req, res) => {
        try {
            const data = JSON.parse(await fs.readFile(dummyDataPath, 'utf-8'));
            const contests = {
                objects: data
            }
            res.status(200).json(contests);
            return;
        } catch (error) {
            res.status(500).json({ error: error.message });
            return;
        }
    }
});