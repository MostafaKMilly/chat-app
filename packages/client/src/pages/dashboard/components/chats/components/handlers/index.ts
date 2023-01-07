import CryptoJS from "crypto-js";
import { decryptMac } from "../../../../utils/encryption/mac";
import { MessageItem } from "../../types/messages.types";
import { AuthenticatedUser } from "../../../../../../context";
import JSEncrypt from "jsencrypt";

export function receiveMessageHandler(
  data: {
    senderId: string;
    sender: { data: string; signature: string };
    receiver: { data: string; signature: string };
  },
  user: AuthenticatedUser,
  privateKey: string
) {
  const socketData =
    Number(data.senderId) === user.id ? data.sender : data.receiver;

  const hash = CryptoJS.MD5(JSON.parse(socketData.data)).toString();
  const jsEncrypt = new JSEncrypt();

  jsEncrypt.setPrivateKey(privateKey);
  const deHashed = jsEncrypt.decrypt(socketData.signature || "");

  if (hash === deHashed) {
    return JSON.parse(socketData.data);
  }
  return null;
}
