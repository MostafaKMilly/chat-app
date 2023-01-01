import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";

export const router = (client: QueryClient) =>
  createBrowserRouter([
    {
      element: <Login />,
      path: "/login",
    },
    {
      element: <Register />,
      path: "/register",
    },
    /* 
  {
      element: <ProtectedLayout />,
      path: "/",
      children: [
        {
          element: <Dashboard />,
          path: "dashboard",
          children: [
            {
                index:true,
                element : <SelectChat />,
            }
            {
                path : "chats/:chatId",
                element : <Chat />,
            }
        },
      ],
    }, */
  ]);