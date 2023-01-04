import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useSocket } from "../../../../../shared/hooks/useSocket";
import { Chats } from "../types/chats.types";

export const useChats = () => {
  const { chats: chatsData } = useLoaderData() as { chats: Chats };
  const { socket } = useSocket();
  const [chats, setChats] = useState(chatsData);
  const [filterdChats, setFilterdChats] = useState(chatsData);

  useEffect(() => {
    socket.on("chatList", ({ users }) => {
      const [chat] = users;
      const newChat = {
        id: chat.id,
        receipentFistName: chat.user.firstName,
        receipentPhone: chat.user.phone,
      };
      setChats([...chatsData, newChat]);
    });
  }, []);
  const filterChats = (number: string) => {
    if (!number) {
      setFilterdChats(chats);
      return;
    }
    setFilterdChats(
      chats.filter((chat) => chat.receipentPhone.includes(number))
    );
  };

  return { chats: filterdChats, filterChats };
};
