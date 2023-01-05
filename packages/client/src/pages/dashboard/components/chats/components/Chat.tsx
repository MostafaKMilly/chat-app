import { Box, InputBase, Button } from "@mui/material";
import { Message } from "./Message";
import EditIcon from "@mui/icons-material/Edit";
import {
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import API from "../../../../../api/httpClient";
import { Suspense, useEffect, useState, useRef } from "react";
import { LoadingSpinner } from "../../../../../shared/components";
import { Messages } from "../types/messages.types";
import { useAuthenticatedUser } from "../../../../../shared/hooks";
import { useSocket } from "../../../../../shared/hooks/useSocket";
import classes from "./styles.module.css";

import { getMac } from "../../../utils/encryption/mac";
import { receiveMessageHandler } from "./handlers";

const getMessagesQuery = (chatId: number) => ({
  queryKey: ["messages", chatId],
  queryFn: () => API.post("/messages", { chatId }),
});

const loader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const chatId = Number(params.chatId);
    const messages =
      client.getQueryData(getMessagesQuery(chatId).queryKey) ??
      client.fetchQuery(getMessagesQuery(chatId));

    return defer({ messages });
  };

export const Chat = () => {
  const { chatId } = useParams();
  const data = useLoaderData() as Record<string, any>;
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuthenticatedUser();
  const { socket } = useSocket(chatId);
  const [allMessages, setAllMessages] = useState<Messages>([]);
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    data?.messages?.data
      ? setAllMessages(data?.messages?.data)
      : data.messages
          ?.then((response: { data: Messages }) => {
            setAllMessages(response.data);
          })
          ?.catch(() => {
            setFailed(true);
          });
  }, [data]);

  const handleLeaveChat = () => {
    navigate("/");
  };

  useEffect(() => {
    if (chatBoxRef?.current) {
      const scrollHeight = chatBoxRef.current.scrollHeight;
      const height = chatBoxRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chatBoxRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [allMessages]);

  socket.on("messagesList", (socketData) => {
    const newMessage = receiveMessageHandler(socketData, user!);
    if (newMessage) setAllMessages([...allMessages, newMessage]);
  });

  const handleSendMessage = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      const newMessage = {
        message: event.currentTarget.value,
      };
      console.log(user);

      const mac = getMac(JSON.stringify(newMessage), user?.macKey);
      socket.emit("send message", { mac, chatId });
      event.currentTarget.value = "";
    }
  };

  return (
    <Box height="100%" width="100%" position="relative">
      <Box
        display="flex"
        flexDirection="column"
        rowGap={4}
        height="calc(100% - 127px)"
        width="100%"
        overflow="scroll"
        px={4}
        py={1}
        ref={chatBoxRef}
        className={classes.chatBox}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <>
            {failed
              ? "Failed"
              : allMessages.map((message) => (
                  <Message
                    key={message.id}
                    content={message.content}
                    type={user?.id === message.userId ? "recipient" : "sender"}
                  />
                ))}
          </>
        </Suspense>
      </Box>
      <Box
        position="absolute"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bottom={65}
        width="100%"
        columnGap={2}
        p={1}
        sx={{ color: "#fff", border: "1px solid lightgrey" }}
      >
        <InputBase
          placeholder="Type a message"
          fullWidth
          startAdornment={<EditIcon sx={{ color: "lightgray", mr: 1 }} />}
          onKeyDown={handleSendMessage}
        />
        <Button variant="contained" color="error" onClick={handleLeaveChat}>
          Leave
        </Button>
      </Box>
    </Box>
  );
};

Chat.loader = loader;
