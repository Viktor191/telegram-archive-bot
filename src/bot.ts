import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { API_ID, API_HASH, STRING_SESSION } from "./config/env";
import {handleNewMessage} from "./services/handleNewMessage";
import {handleEditedMessage} from "./services/handleEditedMessage";


const stringSession = new StringSession(STRING_SESSION);

(async () => {
    const client = new TelegramClient(stringSession, Number(API_ID), API_HASH, {
        connectionRetries: 5,
    });

    await client.connect();
    console.log("🤖 Бот запущен и подключён к Telegram");

    const me = await client.getMe();
    await client.getDialogs();

    handleNewMessage(client, me);
    handleEditedMessage(client, me);
})();