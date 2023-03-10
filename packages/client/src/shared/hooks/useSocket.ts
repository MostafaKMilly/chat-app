import { useEffect, useMemo } from "react";
import socket from "../../socket/socket";
import { useAuthenticatedUser } from "./useAuthenticatedUser";

export const useSocket = (config?: { chatId?: number }) => {
  const { user } = useAuthenticatedUser();

  const activeSocket = useMemo(() => {
    socket.auth = {
      userId: user?.id,
      ...config,
    };
    return socket.connect();
  }, [user, config]);

  useEffect(() => {
    // Ensure that the socket is connected
    activeSocket.connect();
    activeSocket.on("connect", () => {
      console.log("Socket connected");
    });

    return () => {
      activeSocket.disconnect();
      activeSocket.offAny();
    };
  }, []);

  return { socket: activeSocket };
};
