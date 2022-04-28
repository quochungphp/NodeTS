/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import express from "express";
import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { v4 as uuidv4 } from "uuid";
import onHeaders from "on-headers";
import { rootLogger } from "../Logger";

@Middleware({ type: "before" })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: express.NextFunction): void {
    const correlationId = (
      request.headers["request-id"] ||
      request.headers["x-request-id"] ||
      request.headers["x-correlation-id"] ||
      uuidv4()
    ).toString();
    const startTime = process.hrtime();
    const { method, baseUrl, body } = request;
    const url = (baseUrl || "") + (request.url || "-");
    const route = `${method} ${request.route ? request.route.path : url}`;

    const logger = rootLogger.child({ correlationId, route, url, method });
    onHeaders(response, function onHeaders() {
      const diff = process.hrtime(startTime);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

      response.setHeader("X-Response-Time", responseTime);
      logger.info(
        {
          responseTime,
          reqBody: body,
          statusCode: response.statusCode,
        },
        "Responsed",
      );
    });

    request.logger = logger;
    request.correlationId = correlationId;

    response.setHeader("x-correlation-id", correlationId);
    next();
  }
}
