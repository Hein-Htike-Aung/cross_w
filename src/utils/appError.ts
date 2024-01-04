export default class AppError extends Error {
  statusCode: number;
  message: any;
  constructor(message: never, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
