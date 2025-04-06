// this is for any kind of error.

import httpStatus from "http-status";

export class AppError extends Error {
  statusCode: number;
  name: string;
  constructor(statusCode:number, message: string) {
    super(message)
    this.statusCode = statusCode? statusCode : httpStatus.FORBIDDEN;
    this.name = 'AppError'
  }
}
