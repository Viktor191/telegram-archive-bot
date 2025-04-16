import { Api, TelegramClient } from "telegram";
import { markMessageAsRemoved } from "../utils/markMessageAsRemoved";

export const handleDeletedMessage = async (client: TelegramClient) => {
    client.addEventHandler((update: any) => {
        // Обработка удаления сообщений в обычных чатах и группах
        if (update instanceof Api.UpdateDeleteMessages) {
            update.messages.forEach((msgId: number) => {
                const updatedMessages = markMessageAsRemoved(msgId);
                if (updatedMessages && updatedMessages.length > 0) {
                    updatedMessages.forEach((msg: any) => {
                        console.log("📨 Удалены сообщения:", msg);
                    });
                } else {
                    console.warn(`Сообщения с messageId ${msgId} не найдены.`);
                }
            });
        }

        // Обработка удаления сообщений в каналах
        if (update instanceof Api.UpdateDeleteChannelMessages) {
            update.messages.forEach((msgId: number) => {
                const updatedMessages = markMessageAsRemoved(msgId);
                if (updatedMessages && updatedMessages.length > 0) {
                    updatedMessages.forEach((msg: any) => {
                        console.log("📨 Удалены сообщения:", msg);
                    });
                } else {
                    console.warn(`Сообщения с messageId ${msgId} не найдены.`);
                }
            });
        }
    });
};