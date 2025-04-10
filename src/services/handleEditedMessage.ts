import { Api, TelegramClient } from "telegram";
import { saveMessageToFile } from "./saveMessageToFile";
import {normalizeMessage} from "../utils/normalizeMessage";

export const handleEditedMessage = async (
    client: TelegramClient,
    me: Api.User
) => {
    client.addEventHandler((update: any) => {
        // Фильтруем обновления, относящиеся к редактированным сообщениям
        if (update instanceof Api.UpdateEditMessage || update instanceof Api.UpdateEditChannelMessage) {
            // Приводим объект сообщения к типу Api.Message
            const message = update.message as Api.Message;
            if (!message || !message.message) return;

            const normalizedEdited = normalizeMessage(message, "edited", me);

            console.log("✏️ Отредактированное сообщение:", normalizedEdited);
            saveMessageToFile(normalizedEdited);
        }
    });
};