import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesDir = path.join(__dirname, '../../routes');
const routes = [];

const loadRoutes = async () => {
    try {
        const files = await fs.readdir(routesDir);
        for (const file of files) {
            const filePath = path.join(routesDir, file);
            const module = await import(filePath);
            routes.push(module.default);
        }
    } catch (error) {
        console.error('Error loading routes:', error);
    }
};

export default { routes, loadRoutes };