import { Prisma } from "@prisma/client";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import prisma from "../db";
import { decryptMac, getMac } from "../utils/encryption/mac";
const CryptoJS = require("crypto-js");

async function receiveMessageHandler(payload: {
  hmac: string;
  tag: string;
  iv: CryptoJS.lib.WordArray;
}) {
  // @ts-ignore
  const { socket, io } = this;
  const userId = Number(socket.handshake.auth.userId as string);

  if (process.env.MAC_KEY) {
    // Generating the HMAC for the tag.
    const HMAC = CryptoJS.HmacSHA256(
      payload.tag,
      process.env.MAC_KEY
    ).toString();
    // Make sure that the HMAC is equal to the one which we receive it.
    if (payload.hmac === HMAC) {
      // Decrypt the message to get its data.
      const res = decryptMac(payload.tag, process.env.MAC_KEY, payload.iv);
      const receivedMessage = JSON.parse(res);
      const newMessage = await prisma.message.create({
        data: {
          userId: userId,
          chatId: receivedMessage.chatId,
          content: receivedMessage.message,
        },
      });

      const mac = getMac(JSON.stringify(newMessage), process.env.MAC_KEY);
      console.log(receivedMessage, userId, payload);
      io.in(receivedMessage.chatId.toString()).emit("messagesList", mac);
    }
  }
}

export default {
  receiveMessageHandler,
};
