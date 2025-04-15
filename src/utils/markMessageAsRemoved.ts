import fs from "fs";
import path from "path";

const filePath = path.resolve("logs", "messages.json");

// Функция для обновления поля removed для сообщения с определённым messageId
export const markMessageAsRemoved = (messageId: number): any => {
    try {
        const data = fs.readFileSync(filePath, "utf-8"); // Чтение файла messages.json
        const messages = JSON.parse(data);

        // Найти сообщение по messageId
        const message = messages.find((msg: any) => msg.messageId === messageId);
        if (message) {
            message.removed = true;
            console.log(`Сообщение с messageId ${messageId} помечено как удалённое.`);
            // Записываем обновлённые данные обратно в файл
            fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
            return message; // Возвращаем обновлённое сообщение
        } else {
            console.warn(`Сообщение с messageId ${messageId} не найдено.`);
            return null;
        }
    } catch (error) {
        console.error("Ошибка при обновлении файла сообщений:", error);
        return null;
    }
};