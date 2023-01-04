import { Box, Toolbar } from "@mui/material";
import { QueryClient, QueryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { defer, Outlet, useNavigation } from "react-router-dom";
import API from "../../api/httpClient";
import { useSocket } from "../../shared/hooks/useSocket";
import { AppBar } from "./components/appbar";
import { ChatsContainer } from "./components/chats";
import { AppDrawer } from "./components/drawer";
import { RawChats, Chats } from "./components/drawer/types/chats.types";
import { mapChatsResponse } from "./utils";

const chatsQuery = {
  queryKey: ["chats"],
  queryFn: () => API.get<Chats, RawChats>("/chats", mapChatsResponse),
  cacheTime: 0,
};

const loader = (client: QueryClient) => async () => {
  const chats =
    client.getQueryData(chatsQuery.queryKey) ??
    (await client.fetchQuery(chatsQuery));

  return defer({ chats });
};

export const Dashboard = () => {
  const { state } = useNavigation();
  const [drawer, setDrawer] = useState(false);
  const { socket } = useSocket();

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
