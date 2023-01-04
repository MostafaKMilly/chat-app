import prisma from "../db";
import { decryptMac, getMac } from "../utils/encryption/mac";
import { getKeys } from "../utils/encryption/pgp";
const CryptoJS = require("crypto-js");
// @ts-ignore
import JSEncrypt from "nodejs-jsencrypt";

async function receiveMessageHandler(payload: {
  mac: { hmac: string; tag: string; iv: CryptoJS.lib.WordArray };
  chatId: string;
}) {
  // @ts-ignore
  const { socket, io } = this;
  const userId = Number(socket.handshake.auth.userId as string);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const receiverChats = await prisma.chat.findMany({
    select: {
      users: {
        where: {
          NOT: {
            user: {
              id: userId,
            },
          },
        },
        include: {
          user: true,
        },
      },
    },
    where: {
      AND: [
        {
          id: Number(payload.chatId),
        },
      ],
    },
  });

  const receiver = receiverChats?.[0]?.users?.[0]?.user;

  console.log(user);
  console.log(receiver);
  console.log(payload.chatId);

  const keys = getKeys();

  if (user?.macKey) {
    // Generating the HMAC for the tag.
    const HMAC = CryptoJS.HmacSHA256(payload.mac.tag, user?.macKey).toString();
    // Make sure that the HMAC is equal to the one which we receive it.
    if (payload.mac.hmac === HMAC) {
      // Decrypt the message to get its data.
      const res = decryptMac(payload.mac.tag, user?.macKey, payload.mac.iv);
      const receivedMessage = JSON.parse(res);
      const newMessage = await prisma.message.create({
        data: {
          userId: userId,
          chatId: Number(payload.chatId),
          content: receivedMessage.message,
        },
      });

      /* const hash = CryptoJS.MD5(newMessage);
      const jsEncrypt = new JSEncrypt();
      jsEncrypt.setPublicKey(keys.publicKey);
      const signature = jsEncrypt.encrypt(hash.toString());

      io.in(receivedMessage.chatId.toString()).emit("messagesList", {
        signature,
        data: newMessage,
      }); */

      const senderMac = getMac(JSON.stringify(newMessage), user?.macKey);
      const receiverMac = getMac(JSON.stringify(newMessage), receiver?.macKey);

      io.in(payload.chatId).emit("messagesList", {
        senderId: userId,
        sender: senderMac,
        receiver: receiverMac,
      });
    }
  }
}

export default {
  receiveMessageHandler,
};
