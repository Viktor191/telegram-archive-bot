import { Api, TelegramClient } from "telegram";
import { saveMessageToFile } from "./saveMessageToFile";

// Функция для обработки обновлений об удалении сообщений
export const handleDeletedMessage = async (client: TelegramClient) => {
    client.addEventHandler((update: any) => {
        // Обработка удаления сообщений в обычных чатах и группах
        if (update instanceof Api.UpdateDeleteMessages) {
            // update.messages - массив ID удалённых сообщений
            console.log("🗑 Удалены сообщения:", update.messages);
            // Логирование удаления (можно сохранить в файл или БД)
            saveMessageToFile({
                type: "deleted",
                messages: update.messages,
                timestamp: new Date().toISOString()
            });
        }

        // Обработка удаления сообщений в каналах
        if (update instanceof Api.UpdateDeleteChannelMessages) {
            console.log("🗑 Удалены сообщения в канале:", update.messages);
            saveMessageToFile({
                type: "deleted",
                channelId: update.channelId.toString(),
                messages: update.messages,
                timestamp: new Date().toISOString()
            });
        }
    });
};