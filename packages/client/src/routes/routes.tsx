import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedLayout } from "../layouts";
import { Chat, Dashboard, SelectChat } from "../pages/dashboard";
import { Login } from "../pages/login";
import { Register } from "../pages/register";

export const router = (client: QueryClient) =>
  createBrowserRouter([
    {
      element: <Login />,
      path: "/login",
      action: Login.action,
      loader: Login.loader,
    },
    {
      element: <Register />,
      path: "/register",
      action: Register.action,
      loader: Register.loader,
    },
    {
      element: <ProtectedLayout />,
      path: "/",
      loader: ProtectedLayout.loader(client),
      children: [
        {
          element: <Dashboard />,
          loader: Dashboard.loader(client),
          path: "",
          children: [
            {
              index: true,
              element: <SelectChat />,
            },
            {
              path: "chats/:chatId",
              element: <Chat />,
            },
          ],
        },
      ],
    },
  ]);
