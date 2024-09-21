import bot from '../bot/bot.js';

const sendMessageToChatId = (chatId, message) => {
    try{
        bot.sendMessage(chatId, message);
        bot.sendMessage(chatId, "Thanks for using the service!");
        return {success: "Message sent successfully"};
    } catch (error) {
        return {err: "Error sending message"};
    }
};

export default sendMessageToChatId;
