import { useContext } from "react";
import { AuthContext } from "../../context";

export const useAuthenticatedUser = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("You can not use context outside of AuthProvider");
  }

  return value;
};
