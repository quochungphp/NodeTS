import { HttpError } from "routing-controllers";

export type NotFoundResourceType = 'UserNotFound' | "ProductNotFound";
export class NotFoundException extends HttpError {
  constructor(
    private correlationId: string,
    private debugMessage: string,
    private resource: NotFoundResourceType,
  ) {
    super(404);
    Object.setPrototypeOf(this, NotFoundException.prototype);
    this.resource = resource;
  }

  toJSON(): Record<string, string | Record<string, string>> {
    return {
      id: this.correlationId,
      resource: this.resource,
      options: {},
      status: "ERROR",
      debugMessage: this.debugMessage,
    };
  }
}
