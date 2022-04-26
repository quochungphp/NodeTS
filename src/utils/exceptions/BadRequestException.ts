import { HttpError } from "routing-controllers";

export class BadRequestException extends HttpError {
  constructor(public correlationId: string, private debugMessage: string, resource: string) {
    super(400);
    Object.setPrototypeOf(this, BadRequestException.prototype);
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
