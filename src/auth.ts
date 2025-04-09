import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { API_ID, API_HASH, STRING_SESSION } from "./config/env";
import readline from "readline";

// Ввод с терминала
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const ask = (question: string): Promise<string> => {
    return new Promise((resolve) => rl.question(question, resolve));
};

const stringSession = new StringSession("");

(async () => {
    console.log("🔐 Запуск авторизации...");

    const client = new TelegramClient(stringSession, Number(API_ID), API_HASH, {
        connectionRetries: 5,
    });

    await client.start({
        phoneNumber: async () => await ask("📱 Введите номер телефона: "),
        password: async () => await ask("🔑 Введите пароль (если установлен): "),
        phoneCode: async () => await ask("📨 Введите код из Telegram: "),
        onError: (err: unknown) => console.log("❌ Ошибка авторизации:", err),
    });

    console.log("✅ Успешная авторизация!");
    console.log("📝 Ваша stringSession:\n");
    console.log(client.session.save());

    rl.close();
    await client.disconnect();
})();