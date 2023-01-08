import JSEncrypt from "jsencrypt";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../../../../shared/hooks/useSocket";
import { getMac } from "../../../utils/encryption/mac";
import { Messages } from "../types/messages.types";
import { decryptMacMessage } from "../utils/decryptMacMessage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../../../../../api/httpClient";

const getMessagesQuery = (chatId: number) => ({
  queryKey: ["messages", chatId],
  queryFn: () =>
    API.post<Messages, Messages>("/messages", { chatId }, (res) => res),
});

export const useMessages = () => {
  const params = useParams();
  const chatId = Number(params.chatId);
  const client = useQueryClient();
  const { data: messages = [] } = useQuery<Messages>(getMessagesQuery(chatId));
  const { socket } = useSocket({ chatId });

  const handleSendMessage = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        const newMessage = {
          chatId,
          message: event.currentTarget.value,
        };
        const mac = getMac(JSON.stringify(newMessage), "my-key");
        socket.emit("send message", mac);
        event.currentTarget.value = "";
      }
    },
    [socket, chatId]
  );

  React.useEffect(() => {
    socket.on("messagesList", (newMessage) => {
      const decryptedMessage = decryptMacMessage(newMessage);
      // If the decrypted message has been decrypted successfully
      if (decryptedMessage) {
        client.setQueryData<Messages>(["messages", chatId], (oldData) => {
          return oldData
            ? ([...oldData, decryptedMessage] as Messages)
            : oldData;
        });
      }
    });
    socket.on("getPublicKey", (data) => {
      const jsEncrypt = new JSEncrypt();
      jsEncrypt.setPublicKey(data);
      const encrypted = jsEncrypt.encrypt("my-key");
      socket.emit("sendSessionKey", encrypted);
    });

    socket.on("confirmConnection", (data) => console.log(data));

    return () => {
      socket.off("messagesList");
      socket.off("getPublicKey");
      socket.off("confirmConnection");
      socket.disconnect();
    };
  }, [client, socket, chatId]);

  return { messages: messages as Messages, handleSendMessage };
};
