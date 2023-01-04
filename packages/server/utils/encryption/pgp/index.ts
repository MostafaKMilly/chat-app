const RSA = require("node-rsa");
const key = new RSA().generateKeyPair();

export function getKeys() {
  const publicKey = key.exportKey("public");
  const privateKey = key.exportKey("private");

  process.env["PRIVATE_KEY"] = privateKey;
  process.env["PUBLIC_KEY"] = publicKey;

  return { publicKey, privateKey };
}
