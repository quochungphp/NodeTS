/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { Middleware, HttpError, ExpressErrorMiddlewareInterface } from "routing-controllers";
import { ValidationError } from "class-validator";
import * as express from "express";
import { NotFoundException } from "../exceptions/NotFoundException";

export type ErrorResponse = {
  debugMessage: string;
  id: string;
  status: string;
  type: string;
  options?: unknown;
  errors?: ValidationError[];
};
type BadRequestValidationError = {
  errors: ValidationError[];
};
function isBadRequestValidationError(
  error: Error | BadRequestValidationError | AppError,
): error is BadRequestValidationError {
  if (Array.isArray((error as BadRequestValidationError).errors)) {
    return true;
  }

  return false;
}

type AppError = Error & {
  correlationId: string;
};
@Middleware({ type: "after" })
export class ErrorFormatterMiddleware implements ExpressErrorMiddlewareInterface {
  public async error(
    error: Error,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    request.logger.error(
      { errorMessage: error.message, errorStack: error.stack },
      "error formatter handling error",
    );

    // if its an array of ValidationError
    if (isBadRequestValidationError(error)) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((errorObject) => {
        if (!errorObject.constraints) {
          return;
        }
        const [message] = Object.values(errorObject.constraints);
        fieldErrors[errorObject.property] = message;
      });

      const responseObject = {
        debugMessage:
          "You have an error in your request's body. Check 'errors' field for more details!",
        id: request.correlationId,
        status: "ERROR",
        type: "ValidationError",
        errors: error.errors,
        fieldErrors,
      };

      response.status(400).json(responseObject);
      return;
    }

    const status = error instanceof HttpError && error.httpCode ? error.httpCode : 500;

    if (JSON.parse(JSON.stringify(error)).type) {
      response.status(status).json(error);
      return;
    }

    if (error instanceof NotFoundException) {
      const responseObject = error.toJSON();
      response.status(status).json(responseObject);
      return;
    }

    if (error instanceof Error) {
      const responseObject: ErrorResponse = {
        debugMessage: error.message,
        id: request.correlationId,
        status: "ERROR",
        type: "GenericApplicationError",
      };

      response.status(status).json(responseObject);
      return;
    }

    if (typeof error === "string") {
      const responseObject: ErrorResponse = {
        debugMessage: error,
        id: request.correlationId,
        status: "ERROR",
        type: "GenericApplicationError",
      };

      response.status(status).json(responseObject);
      return;
    }

    const responseObject: ErrorResponse = {
      debugMessage: "unknown error",
      id: request.correlationId,
      status: "ERROR",
      type: "GenericApplicationError",
    };

    response.status(status).json(responseObject);
  }
}
