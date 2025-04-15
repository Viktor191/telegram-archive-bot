# Telegram Archive Bot

Бот на основе GramJS, который сохраняет входящие сообщения из всех чатов Telegram в JSON-файл. Бот также логирует редактирование и удаление сообщений, обновляя соответствующие записи.

## 📦 Установка и запуск

1. **Клонировать репозиторий**

   ```bash
git clone https://github.com/ваш-логин/telegram-archive-bot.git
cd telegram-archive-bot
   ```

2. **Установить зависимости**

   ```bash
npm install
   ```

3. **Создать Telegram приложение**

   1. Перейдите на [my.telegram.org](https://my.telegram.org/)
   2. Авторизуйтесь с помощью своего номера телефона
   3. Откройте раздел **API development tools**
   4. Заполните:
      - **App title** — любое имя, например `ArchiveBot`
      - **Short name** — например `archivebot`
   5. Скопируйте `api_id` и `api_hash`

4. **Настроить переменные окружения**

   Создайте файл `.env` в корне проекта и добавьте:

   ```env
TG_API_ID=ваш_api_id
TG_API_HASH=ваш_api_hash
STRING_SESSION=
   ```

5. **Получить stringSession (один раз)**

   ```bash
npx ts-node src/auth.ts
   ```

   Вас попросят ввести:
   - Номер телефона в международном формате
   - Код подтверждения из Telegram
   - Пароль, если включена двухфакторная аутентификация

   После успешной авторизации будет выведена строка `stringSession`. Скопируйте её и вставьте в `.env`:

   ```env
STRING_SESSION=вставьте_сюда_значение
   ```

6. **Запустить бота**

   ```bash
npx ts-node src/bot.ts
   ```

   Бот запустится, подключится к Telegram и начнёт логировать входящие, отредактированные и удалённые сообщения в файл `logs/messages.json`.

## 📝 Структура проекта

```
telegram-archive-bot/
├── src/
│   ├── auth.ts                   # Скрипт для получения stringSession
│   ├── bot.ts                    # Основной файл запуска бота
│   ├── config/
│   │   └── env.ts                # Конфигурация (TG_API_ID, TG_API_HASH, STRING_SESSION)
│   ├── services/
│   │   ├── handleNewMessage.ts       # Обработчик новых сообщений
│   │   ├── handleEditedMessage.ts    # Обработчик редактирования сообщений
│   │   ├── handleDeletedMessage.ts   # Обработчик удаления сообщений
│   │   └── saveMessageToFile.ts      # Функция сохранения сообщений в лог-файл
│   ├── utils/
│   │   ├── getFormattedDate.ts    # Утилита для форматирования даты
│   │   ├── getChatInfo.ts         # Утилита для определения chatId и chatType
│   │   ├── normalizeMessage.ts    # Функция нормализации сообщений (включает поле removed)
│   │   └── markMessageAsRemoved.ts  # Функция для обновления статуса сообщения (removed)
│   └── logs/
│       └── messages.json         # Файл для хранения логов сообщений
├── .env                          # Файл с переменными окружения
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## ✅ Готово!

После запуска бота все входящие, отредактированные и удалённые сообщения будут сохраняться в `logs/messages.json`. При удалении сообщения соответствующая запись будет обновлена — поле `removed` станет равным `true`. В будущем можно заменить файловое хранилище на базу данных (например, MongoDB) без изменения остальной бизнес-логики.
