export type ChatItem = {
  id: number;
  users: {
    user: {
      firstName: string;
      lastName: string;
      id: string;
      phone: string;
    };
  }[];
};

export type Chats = ChatItem[];
