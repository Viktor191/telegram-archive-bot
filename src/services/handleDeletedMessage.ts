import { Api, TelegramClient } from "telegram";
import { markMessageAsRemoved } from "../utils/markMessageAsRemoved";
import { saveMessageToFile } from "./saveMessageToFile";

export const handleDeletedMessage = async (client: TelegramClient) => {
    client.addEventHandler((update: any) => {
        // Обработка удаления сообщений в обычных чатах и группах
        if (update instanceof Api.UpdateDeleteMessages) {
            update.messages.forEach((msgId: number) => {
                const updatedMessage = markMessageAsRemoved(msgId);
                if (updatedMessage) {
                    console.log("📨 Удалены сообщения:", updatedMessage);
                }
            });
            // Можно сохранить событие удаления, если нужно
            /*saveMessageToFile({
                type: "deleted",
                messages: update.messages,
                timestamp: new Date().toISOString()
            });*/
        }

        // Обработка удаления сообщений в каналах
        if (update instanceof Api.UpdateDeleteChannelMessages) {
            update.messages.forEach((msgId: number) => {
                const updatedMessage = markMessageAsRemoved(msgId);
                if (updatedMessage) {
                    console.log("📨 Удалены сообщения:", updatedMessage);
                }
            });
            saveMessageToFile({
                type: "deleted",
                channelId: update.channelId.toString(),
                messages: update.messages,
                timestamp: new Date().toISOString()
            });
        }
    });
};