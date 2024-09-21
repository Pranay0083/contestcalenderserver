import express from 'express';
import dotenv from 'dotenv';
import bot from '../bot/bot.js'; // Ensure the bot is imported to initialize it
import routes from './controller/routes-controller/index.js';
import createTables from '../db/tables/index.js';
import cors from "cors"
dotenv.config();

const port = process.env.SERVER_PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

const initializeServer = async () => {
    try {
        await routes.loadRoutes();
        routes.routes.forEach(item => {
            app[item.method](`/api${item.url}`, item.func);
        });
        await createTables();
        app.listen(port, async () => {
            console.log('Server started at port ' + port);
        });
    } catch (error) {
        console.error('Error setting up server:', error);
    }
};

initializeServer();