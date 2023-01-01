import React, { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

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

const getUserInfo = () => {
  const token = localStorage.getItem("token")!;
  let user = null;
  try {
    user = jwt_decode(token);
  } catch {
    user = null;
  }
  return user as null | AuthenticatedUser;
};

type AuthenticatedUser = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
};
