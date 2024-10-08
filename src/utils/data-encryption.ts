import * as CryptoJS from 'crypto-js';

export function DataEncryption() {
  const _key = process.env.SECRET_KEY;

  function encrypt(data: any) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), _key!).toString();
    } catch (error) {
      throw error;
    }
  }

  function decrypt(data: any) {
    try {
      return JSON.parse(
        CryptoJS.AES.decrypt(data, _key!).toString(CryptoJS.enc.Utf8),
      );
    } catch (error) {
      throw error;
    }
  }

  return {
    encrypt,
    decrypt,
  };
}
