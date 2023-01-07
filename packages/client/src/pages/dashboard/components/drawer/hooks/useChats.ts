import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useSocket } from "../../../../../shared/hooks/useSocket";
import { chatsQuery } from "../../../Dashboard";
import { Chats } from "../types/chats.types";

export const useChats = (phoneNumber: string | undefined) => {
  const { socket } = useSocket();
  const { data: chatsData = [] } = useQuery<Chats>({
    ...chatsQuery,
    select: (chats) => {
      if (!phoneNumber) {
        return chats;
      }
      return chats.filter((chat) => chat.receipentPhone.includes(phoneNumber));
    },
  });
  const client = useQueryClient();

  useEffect(() => {
    socket.on("chatList", ({ users }) => {
      const [chat] = users;
      const newChat = {
        id: chat.chatId,
        receipentFistName: chat.user.firstName,
        receipentPhone: chat.user.phone,
      };
      client.setQueriesData<Chats[]>(chatsQuery.queryKey, (oldData) => {
        return oldData ? ([...oldData, newChat] as Chats[]) : oldData;
      });
    });
    return () => {
      socket.off("chatList");
    };
  }, [client]);

  return { chats: chatsData };
};
