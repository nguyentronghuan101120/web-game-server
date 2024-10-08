import { DataEncryption } from '../utils/data-encryption';

export class ResponseDataWithEncryption<T> {
  statusCode: number;
  message: string;
  data: T;

  constructor(status: number, message: string, data: T) {
    this.statusCode = status;
    this.message = message;
    this.data = DataEncryption().encrypt(data);
  }
}
