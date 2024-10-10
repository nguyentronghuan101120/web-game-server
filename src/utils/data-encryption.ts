import * as CryptoJS from 'crypto-js';

export function DataEncryption() {
  const _key = process.env.SECRET_KEY;

  function encrypt(data: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), _key!).toString();
  }

  function decrypt(data: any) {
    return JSON.parse(
      CryptoJS.AES.decrypt(data, _key!).toString(CryptoJS.enc.Utf8),
    );
  }

  return {
    encrypt,
    decrypt,
  };
}
