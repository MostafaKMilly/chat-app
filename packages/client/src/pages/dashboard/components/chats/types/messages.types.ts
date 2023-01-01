export type MessageItem = {
  id: number;
  chatId: number;
  content: string;
  createdAt: string;
  userId: number;
};

export type Messages = MessageItem[];
