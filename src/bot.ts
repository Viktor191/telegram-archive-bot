import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { API_ID, API_HASH, STRING_SESSION } from "./config/env";
import { NewMessage } from "telegram/events";
import {getFormattedDate} from "./utils/date";
import {getChatInfo} from "./utils/chat";

const stringSession = new StringSession(STRING_SESSION);

(async () => {
    const client = new TelegramClient(stringSession, Number(API_ID), API_HASH, {
        connectionRetries: 5,
    });

    await client.connect();
    console.log("🤖 Бот запущен и подключён к Telegram");

    const me = await client.getMe();
    await client.getDialogs();

    client.addEventHandler((event) => {
        const message = event.message;
        if (!message || !message.message) return;

        const formattedDate = getFormattedDate(message.date);
        const { chatId, chatType } = getChatInfo(message.peerId);

        let normalizedFromId: string | null = null;
        if (message.fromId) {
            if (typeof message.fromId === "object" && "userId" in message.fromId) {
                normalizedFromId = message.fromId.userId.toString();
            } else {
                normalizedFromId = message.fromId.toString();
            }
        } else if (message.out) {
            normalizedFromId = me.id.toString();
        }

        const normalizedMessage = {
            messageId: message.id,
            text: message.message,
            fromId: normalizedFromId,
            chatId,
            chatType,
            date: formattedDate,
        };

        console.log("📨 Новое сообщение:", normalizedMessage);
    }, new NewMessage({}));
})();