import { useState } from "react";
import {
  Drawer,
  IconButton,
  styled,
  Theme,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChatsList } from "./components";
import { useChats } from "./hooks/useChats";
import AddChatDialog from "./components/AddChatDialog";

export const AppDrawer = ({ open, toggleDrawer }: AppDrawerProps) => {
  const { chats, filterChats } = useChats();
  const matches = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const toLink = (chatId: number) => {
    navigate(`/chats/${chatId}`);
    if (!matches) {
      toggleDrawer?.();
    }
  };

  return (
    <Drawer
      sx={{
        width: matches ? 270 : "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: matches ? 270 : "100%",
          boxSizing: "border-box",
        },
      }}
      variant={matches ? "persistent" : "temporary"}
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton
          onClick={toggleDrawer}
          sx={{
            display: {
              xs: "inline-flex",
              sm: "none",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <TextField
          type="search"
          placeholder="Search for number ..."
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: "grey.400" }} />,
          }}
          onChange={(e) => filterChats(e.target.value)}
        />
      </DrawerHeader>
      <ChatsList toLink={toLink} chats={chats} />
      {!chats.length && (
        <Button sx={{ mx: 2 }} onClick={() => setOpenDialog(true)}>
          Add new Chat
        </Button>
      )}
      <AddChatDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </Drawer>
  );
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.palette.secondary.main}`,
}));

type AppDrawerProps = {
  open: boolean;
  toggleDrawer?: () => void;
};
