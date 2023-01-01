export const CHATS: ChatItem[] = [
  {
    id: 1,
    recipent: {
      id: 1,
      fistName: "Mostafa",
      phone: "094356324",
    },
    messages: [
      {
        id: 1,
        type: "recipient",
        content: "Hi there",
      },
      {
        id: 2,
        type: "sender",
        content: "Hi How are you ?",
      },
      {
        id: 3,
        type: "recipient",
        content: "I am fine",
      },
      {
        id: 4,
        type: "sender",
        content: "I am fine also",
      },
      {
        id: 5,
        type: "sender",
        content: "Where are you from broooo ?",
      },
      {
        id: 6,
        type: "recipient",
        content: "I am from Syria what about you 💆‍♂️💔 ?",
      },
      {
        id: 6,
        type: "sender",
        content: "I am from Syria also ***** 💆‍♂️",
      },
      {
        id: 6,
        type: "recipient",
        content: "Yes I understand *** 😂",
      },
    ],
  },
];

type ChatItem = {
  id: number;
  recipent: {
    id: number;
    fistName: string;
    phone: string;
  };
  messages: {
    id: number;
    type: "recipient" | "sender";
    content: string;
  }[];
};
