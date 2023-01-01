import { Box, InputBase, Button } from "@mui/material";
import { CHATS } from "../../../constants/chats";
import { Message } from "./Message";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export const Chat = () => {
  const messages = CHATS[0].messages;
  const navigate = useNavigate();

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
        {messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            type={message.type}
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
        />
        <Button variant="contained" color="error" onClick={handleLeaveChat}>
          Leave
        </Button>
      </Box>
    </Box>
  );
};
