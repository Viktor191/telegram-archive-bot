# Telegram Archive Bot

Бот на основе [GramJS](https://github.com/gram-js/gramjs), который сохраняет входящие сообщения из всех чатов Telegram в JSON-файл.

## 📦 Установка и запуск

### 1. Клонировать репозиторий

```bash
git clone https://github.com/ваш-логин/telegram-archive-bot.git
cd telegram-archive-bot
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Создать Telegram приложение

1. Перейдите на [my.telegram.org](https://my.telegram.org/)
2. Авторизуйтесь с помощью своего номера телефона
3. Откройте раздел **API development tools**
4. Заполните:
    - **App title** — любое имя, например `ArchiveBot`
    - **Short name** — например `archivebot`
5. Скопируйте `api_id` и `api_hash`

### 4. Настроить .env файл

Создайте файл `.env` в корне проекта и добавьте:

```env
TG_API_ID=ваш_api_id
TG_API_HASH=ваш_api_hash
STRING_SESSION=
```

### 5. Получить stringSession (один раз)

```bash
npx ts-node src/auth.ts
```

Вас попросят ввести:
- номер телефона в международном формате
- код подтверждения из Telegram
- пароль, если включена двухфакторная аутентификация

После успешной авторизации будет выведена строка `stringSession`. Скопируйте её и вставьте в `.env`:

```env
STRING_SESSION=вставьте_сюда_значение
```

### 6. Запустить бота

```bash
npx ts-node src/bot.ts
```

Бот запустится и начнёт логировать входящие сообщения в `logs/messages.json`.

## 📝 Структура проекта

```
telegram-archive-bot/
├── src/
│   ├── auth.ts               # Получение stringSession
│   ├── bot.ts                # Основной файл запуска
│   ├── config/
│   │   └── env.ts            # Переменные окружения
│   ├── services/
│   │   ├── handleNewMessage.ts
│   │   ├── handleEditedMessage.ts
│   │   └── saveMessageToFile.ts
│   ├── utils/
│   │   ├── chat.ts
│   │   └── date.ts
│   └── logs/                 # Папка для логов сообщений
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## ✅ Готово!
Теперь все входящие сообщения будут сохраняться в `logs/messages.json`. В будущем можно подключить базу данных или веб-интерфейс.

