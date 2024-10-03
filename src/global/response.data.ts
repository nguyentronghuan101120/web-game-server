export class ResponseData<T> {
  statusCode: number;
  message: string;
  data: T;

  constructor(status: number, message: string, data: T) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
  }
}
