import { QueryClient } from "@tanstack/react-query";
import { Outlet, redirect } from "react-router-dom";
import API from "../api/httpClient";
import { AuthProvider } from "../context";

const userInfoQuery = {
  queryKey: ["UserInfo"],
  queryFn: () => API.get("auth/user"),
};

const loader = (client: QueryClient) => async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  const user =
    client.getQueryData(userInfoQuery.queryKey) ??
    (await client.fetchQuery(userInfoQuery));
  if (!user) {
    localStorage.clear();
    return redirect("/login");
  }
  return null;
};

export const ProtectedLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

ProtectedLayout.loader = loader;
