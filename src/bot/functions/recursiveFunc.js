import sendMessage from "./sendTelegramMsg.js";

const func = async () => {
    let i = 0;
    while (true) {
        try {
            const status = await sendMessage("7968fbbc-be27-46cf-8b08-90e93f3c82b9", "check");
            console.log(status, i);
            i++;
            
            // Add a delay to avoid hitting rate limits
            await new Promise(resolve => setTimeout(resolve, 10000)); // 1 second delay
        } catch (err) {
            console.log(err);
        }
    }
    return "completed"; // This line will never be reached in an infinite loop
}

console.log(await func());
