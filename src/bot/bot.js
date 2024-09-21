import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();
import addUserToDb from './functions/addUserToDb.js';

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to the bot!");
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

bot.onText(/\/register/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Please enter your email address:");

    const takeMail = async () => {
        bot.once('message', async (msg) => {
            const email = msg.text;
            if (emailRegex.test(email)) {
                bot.sendMessage(chatId, "Thank you! Your email has been registered.");
                const status = await addUserToDb(chatId, email);
                if(status.err) {
                    bot.sendMessage(chatId, "Error registering email. Please try again.");
                    takeMail();
                }else{
                    bot.sendMessage(chatId, "You will now receive notifications from this bot.");
                }
            } else {
                bot.sendMessage(chatId, "Invalid email format. Please try again.");
                takeMail();
            }
        });
    }
    takeMail();
});

bot.on('message', (msg) => {
    if(!msg.text.startsWith('/') && !emailRegex.test(msg.text)) {
        bot.sendMessage(msg.chat.id, "I am not taking any inputs for now on other than /register so please type /register to register your email address.");
    }
})

export default bot;