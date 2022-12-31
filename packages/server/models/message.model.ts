import { User } from "./user.model";

export interface Message {
  id: number;
  userId: number;
  user: User;
  content: string;
  createdAt: Date;
}
