import { getFormattedDate } from "../utils/getFormattedDate";
import { getChatInfo } from "../utils/getChatInfo";
import { Api } from "telegram";

export type NormalizedMessage = {
    messageId: number;
    text: string;
    fromId: string | null;
    chatId: string;
    chatType: string;
    date: string;
    version: "original" | "edited";
    editDate: string | null;
};

export const normalizeMessage = (
    message: Api.Message,
    version: "original" | "edited",
    me: Api.User
): NormalizedMessage => {
    // Вывод значения message.out для отладки
    console.log(`DEBUG: message.out for messageId ${message.id}:`, message.out);

    const formattedDate = getFormattedDate(message.date);
    const { chatId, chatType } = getChatInfo(message.peerId);

    let fromId: string | null = null;
    if (message.fromId) {
        if (typeof message.fromId === "object" && "userId" in message.fromId) {
            fromId = message.fromId.userId.toString();
        } else {
            fromId = message.fromId.toString();
        }
    } else {
        // Если fromId отсутствует, выводим дополнительное значение
        fromId = message.out ? me.id.toString() : chatId;
    }

    return {
        messageId: message.id,
        text: message.message,
        fromId,
        chatId,
        chatType,
        date: formattedDate,
        version,
        editDate:
            version === "edited" && message.editDate
                ? getFormattedDate(message.editDate)
                : null,
    };
};