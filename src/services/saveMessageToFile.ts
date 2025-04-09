import fs from "fs";
import path from "path";

const logsPath = path.resolve("logs");
const filePath = path.join(logsPath, "messages.json");

if (!fs.existsSync(logsPath)) {
    fs.mkdirSync(logsPath);
}

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

export const saveMessageToFile = (message: unknown): void => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        const messages = JSON.parse(data);

        if (Array.isArray(messages)) {
            messages.push(message);
            fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
        } else {
            console.error("📛 Неверный формат messages.json — ожидается массив.");
        }
    } catch (err) {
        console.error("❌ Ошибка при записи сообщения в файл:", err);
    }
};
