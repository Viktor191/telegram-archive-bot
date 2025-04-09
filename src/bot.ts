import {Api, TelegramClient} from "telegram";
import { StringSession } from "telegram/sessions";
import { API_ID, API_HASH, STRING_SESSION } from "./config/env";

const stringSession = new StringSession(STRING_SESSION);

(async () => {
    const client = new TelegramClient(stringSession, Number(API_ID), API_HASH, {
        connectionRetries: 5,
    });

    await client.connect();
    console.log("🤖 Бот запущен и подключён к Telegram");

    client.addEventHandler((update) => {
        if (update instanceof Api.UpdateNewMessage || update instanceof Api.UpdateNewChannelMessage) {
            const message = "message" in update ? update.message as Api.Message : null;
            if (message && message.message) {
                console.log("📨 Новое сообщение:", message.message);
            }
        }
    });
})();