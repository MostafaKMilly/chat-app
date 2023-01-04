import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../shared/utils";

export const AuthContext = createContext<{
  user: AuthenticatedUser | null;
  handleSignout: () => void;
}>({ user: null, handleSignout: () => {} });

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUserInfo);

  const handleSignout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, handleSignout }}>
      {children}
    </AuthContext.Provider>
  );
};

export type AuthenticatedUser = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
};
