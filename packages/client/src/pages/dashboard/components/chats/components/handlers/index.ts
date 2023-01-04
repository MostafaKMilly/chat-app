import CryptoJS from "crypto-js";
import { decryptMac } from "../../../../utils/encryption/mac";
import { MessageItem } from "../../types/messages.types";
import { AuthenticatedUser } from "../../../../../../context";

export function receiveMessageHandler(
  data: {
    senderId: string;
    sender: {
      tag: string;
      hmac: string;
      iv: CryptoJS.lib.WordArray;
    };
    receiver: {
      tag: string;
      hmac: string;
      iv: CryptoJS.lib.WordArray;
    };
  },
  user: AuthenticatedUser
): MessageItem | null {
  const socketData =
    user.id === Number(data?.senderId) ? data?.sender : data?.receiver;
  // Generating the HMAC for the tag.
  const HMAC = CryptoJS.HmacSHA256(
    socketData.tag,
    `${user?.id}${user?.firstName}${user?.lastName}`
  ).toString();
  console.log(socketData.hmac === HMAC);

  // Make sure that the HMAC is equal to the one which we receive it.
  if (socketData.hmac === HMAC) {
    // Decrypt the message to get its data.
    const res = decryptMac(
      socketData.tag,
      `${user?.id}${user?.firstName}${user?.lastName}`,
      socketData.iv
    );

    const newMessage: MessageItem = JSON.parse(res);
    return newMessage;
  }

  return null;
}
