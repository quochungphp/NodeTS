import { HttpError } from "routing-controllers";

export class InvalidCredentialsException extends HttpError {
  constructor(private correlationId: string) {
    super(401);
    Object.setPrototypeOf(this, InvalidCredentialsException.prototype);
  }

  toJSON(): Record<string, string | Record<string, string>> {
    return {
      id: this.correlationId,
      type: "InvalidCredentials",
      options: {},
      status: "ERROR",
    };
  }
}
