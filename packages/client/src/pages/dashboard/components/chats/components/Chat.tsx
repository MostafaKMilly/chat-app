import { Box, InputBase, Button, Typography } from "@mui/material";
import { Message } from "./Message";
import EditIcon from "@mui/icons-material/Edit";
import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import API from "../../../../../api/httpClient";
import { Suspense } from "react";
import { LoadingSpinner } from "../../../../../shared/components";
import { Messages } from "../types/messages.types";
import { useAuthenticatedUser } from "../../../../../shared/hooks";

const getMessagesQuery = (chatId: number) => ({
  queryKey: ["messages", chatId],
  queryFn: () => API.get("/messages", undefined, { data: { chatId } }),
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
  const data = useLoaderData() as Record<string, any>;
  const navigate = useNavigate();
  const { user } = useAuthenticatedUser();

  const handleLeaveChat = () => {
    navigate("/");
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
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Await
            resolve={data.messages}
            errorElement={<Typography>Can not load messages</Typography>}
          >
            {({ data: messages }: { data: Messages }) => (
              <>
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    content={message.content}
                    type={user?.id === message.userId ? "sender" : "recipient"}
                  />
                ))}
              </>
            )}
          </Await>
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
        />
        <Button variant="contained" color="error" onClick={handleLeaveChat}>
          Leave
        </Button>
      </Box>
    </Box>
  );
};

Chat.loader = loader;
