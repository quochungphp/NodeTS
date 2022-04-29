/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable more/no-then */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-empty-function */
import "reflect-metadata";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Connection, ConnectionOptions, createConnection, useContainer } from "typeorm";
import { Action, useExpressServer } from "routing-controllers";
import express, { NextFunction, Request, Response } from "express";
import { Container } from "typeorm-typedi-extensions";
import { UserController } from "../../components/user/user.controller";
import { ProductController } from "../../components/product/product.controller";
import { AppEnvironmentInterface } from "../environment/app-env.interface";
import { AppEnv as AppEnvironment } from "../environment/app-env";
import { UserEntity } from "../../components/user/repositories/user.entity";
import { ProductEntity } from "../../components/product/repositories/product.entity";
import { LoggingMiddleware } from "../../utils/middlewares/logger.middleware";
import { rootLogger } from "../../utils/Logger";
import { AuthController } from "../../components/auth/auth.controller";
import { ErrorFormatterMiddleware } from "../../utils/middlewares/error-formatter.middleware";

export class BootstrapApp {
  public app: express.Application = {} as express.Application;

  public appEnv: AppEnvironmentInterface = {} as AppEnvironmentInterface;

  constructor() {
    this.appEnv = new AppEnvironment();
    this.app = express();
    this.initMiddlewares();
    useExpressServer(this.app, {
      authorizationChecker: async (action: Action, roles: string[]) => {
        // TODO: Implement JWT Token
        const token = action.request.headers.authorization;
        return true;
      },
      controllers: [UserController, ProductController, AuthController],
      cors: this.initCORS(),
      middlewares: [LoggingMiddleware, ErrorFormatterMiddleware],
      defaultErrorHandler: false,
    });
  }

  public initDatabaseConnection(): Promise<Connection> {
    useContainer(Container);
    const { pgDb, pgHost, pgPass, pgUser, pgPort } = this.appEnv;
    const connection: ConnectionOptions = {
      type: "postgres",
      host: pgHost,
      port: pgPort,
      username: pgUser,
      password: pgPass,
      database: pgDb,
      entities: [UserEntity, ProductEntity],
    };
    return createConnection(connection);
  }

  private initCORS(): any {
    const { corsEnabled, corsAllowedOrigins } = this.appEnv;
    const cors = corsEnabled
      ? {
          methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
          allowedHeaders: [
            "Authorization",
            "RefreshToken",
            "Content-Type",
            "Accept",
            "Origin",
            "Referer",
            "User-Agent",
            "Authorization",
            "X-NAB-Signature",
            "X-Api-Key",
            "X-Request-Id",
          ],
          exposedHeaders: [
            "Authorization",
            "RefreshToken",
            "X-Api-Key",
            "AccessToken",
            "X-NAB-Signature",
          ],
          origin(origin: string, callback: (error: Error | null, success?: true) => void) {
            if (corsAllowedOrigins === "all") {
              callback(null, true);
              return;
            }
            if (corsAllowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error(`Origin[${origin}] not allowed by CORS`));
            }
          },
        }
      : {};
    return cors;
  }

  private initRedis(): void {}

  private initWorkers(): void {}

  private initMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  public startApp() {
    this.initDatabaseConnection()
      .then(() => {
        this.app.listen(this.appEnv.port, () => {
          rootLogger.info(`Server is running by port: ${this.appEnv.port}`);
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  public getApp() {
    return this.app;
  }
}
