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

  const hash = CryptoJS.MD5(socketData.data).toString();
  const jsEncrypt = new JSEncrypt();

  jsEncrypt.setPrivateKey(privateKey);
  const dehashed = jsEncrypt.decrypt(socketData.signature || "");

  console.log(hash);
  console.log(dehashed);

  /* const hash = CryptoJS.MD5(JSON.stringify({ hi: 1 })).toString();
  const jsEncrypt = new JSEncrypt();

  jsEncrypt.setPublicKey(publicKey);
  const encr = jsEncrypt.encrypt(hash || "");

  jsEncrypt.setPrivateKey(privateKey);
  const decr = jsEncrypt.decrypt(encr || "");

  console.log(hash);
  console.log(decr); */

  /* const socketData =
    user.id === Number(data?.senderId) ? data?.sender : data?.receiver;
  // Generating the HMAC for the tag.
  const HMAC = CryptoJS.HmacSHA256(
    socketData.tag,
    `${user?.id}${user?.firstName}${user?.lastName}`
  ).toString();

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

  return null; */

  // return data.sender;
}
