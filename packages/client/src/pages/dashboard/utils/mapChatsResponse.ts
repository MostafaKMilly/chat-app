import type { RawChats, Chats } from "../components/drawer/types/chats.types";

export const mapChatsResponse = (res: RawChats): Chats => {
  return res.map((chat) => ({
    id: chat.id,
    receipentFistName: chat.users[0].user.firstName,
    receipentPhone: chat.users[0].user.phone,
  }));
};
