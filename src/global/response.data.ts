import { PaginationAndTotal } from './pagination';

export class ResponseData<T> {
  statusCode: number;
  message: string;
  data: T;
  pagination?: PaginationAndTotal;

  constructor(
    status: number,
    message: string,
    data: T,
    pagination?: PaginationAndTotal,
  ) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
    this.pagination = pagination;
  }
}
