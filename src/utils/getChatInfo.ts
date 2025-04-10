import { Api } from "telegram";

export const getChatInfo = (
    peer: Api.TypePeer
): { chatId: string; chatType: "user" | "chat" | "channel" | "unknown" } => {
    if (peer instanceof Api.PeerUser) {
        return {
            chatId: peer.userId.toString(),
            chatType: "user",
        };
    }

    if (peer instanceof Api.PeerChat) {
        return {
            chatId: peer.chatId.toString(),
            chatType: "chat",
        };
    }

    if (peer instanceof Api.PeerChannel) {
        return {
            chatId: peer.channelId.toString(),
            chatType: "channel",
        };
    }

    return {
        chatId: "0",
        chatType: "unknown",
    };
};