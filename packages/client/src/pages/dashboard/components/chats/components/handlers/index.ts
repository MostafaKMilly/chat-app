import CryptoJS from "crypto-js";
import { decryptMac } from "../../../../utils/encryption/mac";
import { MessageItem } from "../../types/messages.types";

export function receiveMessageHandler(socketData: {
  tag: string;
  hmac: string;
  iv: CryptoJS.lib.WordArray;
}): MessageItem | null {
  // Generating the HMAC for the tag.
  const HMAC = CryptoJS.HmacSHA256(socketData.tag, "my-key").toString();
  // Make sure that the HMAC is equal to the one which we receive it.
  if (socketData.hmac === HMAC) {
    // Decrypt the message to get its data.
    const res = decryptMac(socketData.tag, "my-key", socketData.iv);
    const newMessage: MessageItem = JSON.parse(res);
    return newMessage;
  }

  return null;
}
