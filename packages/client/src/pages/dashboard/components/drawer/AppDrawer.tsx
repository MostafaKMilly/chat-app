import { Suspense } from "react";
import {
  Drawer,
  IconButton,
  styled,
  Theme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingSpinner } from "../../../../shared/components";
import { ChatsList } from "./components";

export const AppDrawer = ({ open, toggleDrawer }: AppDrawerProps) => {
  const data = useLoaderData() as Record<string, any>;
  const matches = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const navigate = useNavigate();

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
        />
      </DrawerHeader>
      <Suspense fallback={<LoadingSpinner />}>
        <Await
          resolve={data?.chats}
          errorElement={<Typography>Error on loading chats</Typography>}
        >
          <ChatsList toLink={toLink} />
        </Await>
      </Suspense>
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
