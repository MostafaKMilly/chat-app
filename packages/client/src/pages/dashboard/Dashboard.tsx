import { Box, Toolbar } from "@mui/material";
import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet, redirect, useNavigation } from "react-router-dom";
import API from "../../api/httpClient";
import { AppBar } from "./components/appbar";
import { ChatsContainer } from "./components/chats";
import { AppDrawer } from "./components/drawer";
import { RawChats, Chats } from "./components/drawer/types/chats.types";
import { mapChatsResponse } from "./utils";

export const chatsQuery = {
  queryKey: ["chats"],
  queryFn: () => API.get<Chats, RawChats>("/chats", mapChatsResponse),
  cacheTime: 0,
};

export const loader = (client: QueryClient) => async () => {
  const chats =
    client.getQueryData(chatsQuery.queryKey) ??
    (await client.fetchQuery(chatsQuery));
  return { chats };
};

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
      <ChatsContainer open={drawer} state={state} maxWidth={false}>
        <Toolbar />
        <Outlet />
      </ChatsContainer>
    </Box>
  );
};

Dashboard.loader = loader;
