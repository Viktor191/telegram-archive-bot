import { Api, TelegramClient } from "telegram";
import { NewMessage } from "telegram/events";
import { NewMessageEvent } from "telegram/events";
import { saveMessageToFile } from "./saveMessageToFile";
import {normalizeMessage} from "../utils/normalizeMessage";

export const handleNewMessage = async (
    client: TelegramClient,
    me: Api.User
) => {
    client.addEventHandler((event: NewMessageEvent) => {
        const message = event.message;
        if (!message || !message.message) return;

        const fromId =
            message.fromId && typeof message.fromId === "object" && "userId" in message.fromId
                ? message.fromId.userId.toString()
                : message.fromId?.toString() ??
                (message.out ? me.id.toString() : null);

        const normalizedOriginal = normalizeMessage(message, "original", me);

        console.log("📨 Новое сообщение:", normalizedOriginal);
        saveMessageToFile(normalizedOriginal);
    }, new NewMessage({}));
};