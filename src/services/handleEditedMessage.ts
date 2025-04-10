import { Api, TelegramClient } from "telegram";
import { getFormattedDate } from "../utils/date";
import { getChatInfo } from "../utils/chat";
import { saveMessageToFile } from "./saveMessageToFile";

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

            const formattedDate = getFormattedDate(message.date);
            // Используем peerId, как и в обработчике новых сообщений
            const { chatId, chatType } = getChatInfo(message.peerId);

            // Нормализация fromId: проверяем, является ли это объектом с полем userId
            const fromId =
                message.fromId && typeof message.fromId === "object" && "userId" in message.fromId
                    ? message.fromId.userId.toString()
                    : message.fromId?.toString() ?? (message.out ? me.id.toString() : null);

            const normalizedEdited = {
                messageId: message.id,
                text: message.message,
                fromId,
                chatId,
                chatType,
                date: formattedDate,
                version: "edited",
                // В GramJS поле редактирования называется editDate (camelCase)
                editDate: message.editDate ? getFormattedDate(message.editDate) : null,
            };

            console.log("✏️ Отредактированное сообщение:", normalizedEdited);
            saveMessageToFile(normalizedEdited);
        }
    });
};