import { CustomError } from "./custom-error";

export class DbConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database";

  constructor() {
    super("Error db connection");

    Object.setPrototypeOf(this, DbConnectionError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.reason }
    ]
  }
}