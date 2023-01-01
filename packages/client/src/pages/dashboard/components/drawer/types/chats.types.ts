export type RawChatItem = {
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

export type RawChats = RawChatItem[];

export type Chats = {
  id: number;
  receipentPhone: string;
  receipentFistName: string;
}[];
