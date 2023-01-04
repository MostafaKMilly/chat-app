import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Chats } from "../types/chats.types";

export const useChats = () => {
  const { chats: chatsData } = useLoaderData() as { chats: Chats };

  const [chats, setChats] = useState(chatsData);

  const filterChats = (number: string) => {
    if (!number) {
      setChats(chats);
      return;
    }
    setChats(chats.filter((chat) => chat.receipentPhone === number));
  };

  return { chats, filterChats };
};
