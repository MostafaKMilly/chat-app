import {
  ListItem,
  ListItemButton as MUIListItemButton,
  ListItemText,
  Avatar,
  List,
  ListItemAvatar,
  styled,
  alpha,
} from "@mui/material";
import { useAsyncValue, useLocation } from "react-router-dom";
import { Chats } from "../types/chats.types";
import PersonIcon from "@mui/icons-material/Person";

export const ChatsList = ({ toLink }: { toLink: (chatId: number) => void }) => {
  const chats = useAsyncValue() as Chats;
  const { pathname } = useLocation();

  return (
    <List
      sx={{
        px: 2,
        rowGap: 2,
        display: "flex",
        flexDirection: "column",
        mt: 1,
        height: "100%",
      }}
    >
      {chats.map((chat) => (
        <ListItem key={chat.id} disablePadding>
          <ListItemButton
            disableRipple
            active={pathname === `/chats/${chat.id}`}
            onClick={() => toLink(chat.id)}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  backgroundColor: "secondary.light",
                  color: "common.black",
                }}
              >
                {<PersonIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ color: "common.black" }}
              primary={chat.receipentFistName}
              secondary={chat.receipentPhone}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const ListItemButton = styled(MUIListItemButton, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  backgroundColor: active
    ? alpha(theme.palette.secondary.light, 0.3)
    : "transparent",
  "&:hover": {
    backgroundColor: active
      ? alpha(theme.palette.secondary.light, 0.3)
      : "transparent",
  },
}));
