import { Api, TelegramClient } from "telegram";
import { NewMessage } from "telegram/events";
import { NewMessageEvent } from "telegram/events";
import { getFormattedDate } from "../utils/date";
import { getChatInfo } from "../utils/chat";
import { saveMessageToFile } from "./saveMessageToFile";

export const handleNewMessage = async (
    client: TelegramClient,
    me: Api.User
) => {
    client.addEventHandler((event: NewMessageEvent) => {
        const message = event.message;
        if (!message || !message.message) return;

        const formattedDate = getFormattedDate(message.date);
        const { chatId, chatType } = getChatInfo(message.peerId);

        const fromId =
            message.fromId && typeof message.fromId === "object" && "userId" in message.fromId
                ? message.fromId.userId.toString()
                : message.fromId?.toString() ??
                (message.out ? me.id.toString() : null);

        const normalizedOriginal = {
            messageId: message.id,
            text: message.message,
            fromId,
            chatId,
            chatType,
            date: formattedDate,
            version: "original",
            editDate: null, // оригинальное сообщение не имеет даты редактирования
        };

        console.log("📨 Новое сообщение:", normalizedOriginal);
        saveMessageToFile(normalizedOriginal);
    }, new NewMessage({}));
};