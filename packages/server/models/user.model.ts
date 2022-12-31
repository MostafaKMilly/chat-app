import { Message } from "./message.model";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  createdAt: Date;
  messages?: Message[];
}
