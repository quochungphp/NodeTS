import { HttpError } from "routing-controllers";

export class BadRequestError extends HttpError {
  constructor(public correlationId: string, private debugMessage: string, resource: string) {
    super(400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  toJSON(): Record<string, string | Record<string, string>> {
    return {
      id: this.correlationId,
      type: "BadRequest",
      options: {},
      status: "ERROR",
      debugMessage: this.debugMessage,
    };
  }
}
