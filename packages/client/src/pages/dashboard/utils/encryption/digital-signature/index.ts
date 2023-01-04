import JSEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";

export const validate = (
  message: string,
  signature: string,
  privateKey: string
) => {
  const hash = CryptoJS.MD5(message);
  const jsEncrypt = new JSEncrypt();

  jsEncrypt.setPrivateKey(privateKey);
  const dehashed = jsEncrypt.decrypt(signature || "");

  console.log(hash.toString());
  console.log(dehashed.toString());

  // return signature;
};
