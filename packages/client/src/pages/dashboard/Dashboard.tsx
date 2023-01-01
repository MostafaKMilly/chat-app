import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { AppBar } from "./components/appbar";
import { ChatsContainer } from "./components/chats";
import { AppDrawer } from "./components/drawer";

export const Dashboard = () => {
  const { state } = useNavigation();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <Box display="flex">
      <AppBar toggleDrawer={toggleDrawer} drawer={drawer} />
      <AppDrawer open={drawer} toggleDrawer={toggleDrawer} />
      <ChatsContainer open={drawer} state={state}>
        <Toolbar />
        <Outlet />
      </ChatsContainer>
    </Box>
  );
};
