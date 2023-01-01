import {
  Drawer,
  IconButton,
  styled,
  Theme,
  useMediaQuery,
  ListItem,
  ListItemButton as MUIListItemButton,
  ListItemText,
  Avatar,
  List,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserChats } from "./hooks";
import { TextField } from "@mui/material";
import { ListItemAvatar } from "@mui/material";

export const AppDrawer = ({ open, toggleDrawer }: AppDrawerProps) => {
  const matches = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const chats = useUserChats();

  const toLink = (link: string) => {
    navigate(link);
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
        <TextField type="search" placeholder="Search for number ..." />
      </DrawerHeader>
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
          <ListItem key={chat.link} disablePadding>
            <ListItemButton
              disableRipple
              onClick={() => toLink(chat.link)}
              active={pathname === chat.link}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    backgroundColor: "secondary.light",
                    color: "common.black",
                  }}
                >
                  {chat.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ color: "common.black" }}
                primary={chat.primaryText}
                secondary={chat.secondaryText}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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

const ListItemButton = styled(MUIListItemButton, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  "&:hover": {
    backgroundColor: active ? theme.palette.secondary.light : "transparent",
  },
}));

type AppDrawerProps = {
  open: boolean;
  toggleDrawer?: () => void;
};
