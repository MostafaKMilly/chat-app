// @ts-ignore
import JSEncrypt from "nodejs-jsencrypt";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { getKeys } from "../utils/encryption/pgp";

export function receiveSessionKeyHandler(data: any) {
  const socket: Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
    // @ts-ignore
  > = this;
  const keys = getKeys();
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPrivateKey(keys.privateKey);
  const decrypted = jsEncrypt.decrypt(data);
  if (decrypted) {
    process.env["MAC_KEY"] = decrypted;
    socket.emit("confirmConnection", "Connected securely");
  }
}
