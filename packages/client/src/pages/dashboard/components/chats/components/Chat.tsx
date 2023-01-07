import { Box, InputBase, Button } from "@mui/material";
import { Message } from "./Message";
import EditIcon from "@mui/icons-material/Edit";
import { LoaderFunctionArgs, useNavigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import API from "../../../../../api/httpClient";
import { useEffect, useRef } from "react";
import { useAuthenticatedUser } from "../../../../../shared/hooks";
import classes from "./styles.module.css";
import { useMessages } from "../hooks/useMessages";

const getMessagesQuery = (chatId: number) => ({
  queryKey: ["messages", chatId],
  queryFn: () => API.post("/messages", { chatId }, (res) => res),
});

export const loader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const chatId = Number(params.chatId);
    const messages =
      client.getQueryData(getMessagesQuery(chatId).queryKey) ??
      (await client.fetchQuery(getMessagesQuery(chatId)));

    return { messages };
  };

export const Chat = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuthenticatedUser();
  const { messages, handleSendMessage } = useMessages();

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
  }, []);

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
        {messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            type={user?.id === message.userId ? "recipient" : "sender"}
          />
        ))}
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
