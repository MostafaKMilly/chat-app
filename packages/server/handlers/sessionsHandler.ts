// @ts-ignore
import JSEncrypt from "nodejs-jsencrypt";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { getKeys } from "../utils/encryption/pgp";
import prisma from "../db";

export async function receiveSessionKeyHandler(data: any) {
  const socket: Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
    // @ts-ignore
  > = this.socket;
  // @ts-ignore
  const userId: number = Number(this.userId);

  const keys = getKeys();
  /* const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPrivateKey(keys.privateKey);
  const decrypted = jsEncrypt.decrypt(data); */

  if (data) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      const newUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          dsKey: data,
        },
      });
    }

    socket.emit("confirmConnection", "Connected securely");
  }
}
