import fs from "fs";
import path from "path";

const filePath = path.resolve("logs", "messages.json");

// Функция обновляет поле removed для всех сообщений с данным messageId и возвращает массив обновлённых сообщений.
export const markMessageAsRemoved = (messageId: number): any[] => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        const messages = JSON.parse(data);

        const updatedMessages: any[] = [];
        messages.forEach((msg: any) => {
            if (msg.messageId === messageId) {
                msg.removed = true;
                updatedMessages.push(msg);
            }
        });

        fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
        if (updatedMessages.length > 0) {
            console.log(`Сообщения с messageId ${messageId} помечены как удалённые.`);
        }
        return updatedMessages;
    } catch (error) {
        console.error("Ошибка при обновлении файла сообщений:", error);
        return [];
    }
};