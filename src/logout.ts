import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { API_ID, API_HASH, STRING_SESSION } from "./config/env";

(async () => {
    const client = new TelegramClient(new StringSession(STRING_SESSION), Number(API_ID), API_HASH, {
        connectionRetries: 5,
    });
    await client.connect();
    console.log("Выход из аккаунта...");
    await client.invoke(new Api.auth.LogOut());
    console.log("Вы успешно вышли из аккаунта.");
    process.exit(0);
})();
// npx ts-node src/logout.ts