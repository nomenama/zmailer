import dotenv from "dotenv";

dotenv.config();


// Write log function
export const writeLog = (message, type = "info") => {
    const logType = type.toUpperCase();

    const formattedMessage = `[${logType}] ${
        type === "error" && message.stack ? message.stack : message
    } \n`;

    return type === "error" ? console.error(formattedMessage) : type === "warning" ? console.warn(formattedMessage)  : console.log(formattedMessage);
};
