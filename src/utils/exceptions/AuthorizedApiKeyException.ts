import { HttpError } from "routing-controllers";

export class AuthorizedApiKeyException extends HttpError {
  constructor(private correlationId: string) {
    super(401);
    Object.setPrototypeOf(this, AuthorizedApiKeyException.prototype);
  }

  toJSON(): Record<string, string | Record<string, string>> {
    return {
      id: this.correlationId,
      status: "ERROR",
      type: "AuthorizedApiKeyException",
      debugMessage: "The API Key invalid",
      options: {},
    };
  }
}
