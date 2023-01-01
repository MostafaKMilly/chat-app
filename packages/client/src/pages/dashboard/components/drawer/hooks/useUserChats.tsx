import PersonIcon from "@mui/icons-material/Person";
import { CHATS } from "../../../constants/chats";

export const useUserChats = () => {
  const chats: ChatItem[] = CHATS.map((chat) => ({
    link: `chats/${chat.id}`,
    primaryText: chat.recipent.fistName,
    secondaryText: chat.recipent.phone,
    avatar: <PersonIcon />,
  }));
  return chats;
};

type ChatItem = {
  primaryText: string;
  secondaryText: string;
  link: string;
  avatar?: React.ReactElement;
};
