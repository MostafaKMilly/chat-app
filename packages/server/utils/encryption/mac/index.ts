const CryptoJS = require("crypto-js");

export const getMac = (data: string, key: string) => {
  const iv = CryptoJS.lib.WordArray.random(16).toString();
  const encrypted = CryptoJS.AES.encrypt(data, key, { iv }).toString();
  const HMAC = CryptoJS.HmacSHA256(encrypted.toString(), key).toString();
  return { hmac: HMAC, tag: encrypted, iv };
};

export const decryptMac = (
  tag: string,
  key: string,
  iv: CryptoJS.lib.WordArray
) => {
  const decrypted = CryptoJS.AES.decrypt(tag, key, {
    iv,
  }).toString(CryptoJS.enc.Utf8);
  return decrypted;
};
