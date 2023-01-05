import jwt_decode from "jwt-decode";

export const getUserInfo = () => {
  const token = localStorage.getItem("token")!;
  let user = null;
  try {
    user = jwt_decode(token);
  } catch {
    user = null;
  }
  return user as null | AuthenticatedUser;
};

export type AuthenticatedUser = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  macKey?: string;
};
