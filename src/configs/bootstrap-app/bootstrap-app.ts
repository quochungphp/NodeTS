/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ConnectionOptions, createConnection,useContainer } from 'typeorm';
import { Action, useExpressServer } from 'routing-controllers';
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../../components/user/user.controller';
import { ProductController } from '../../components/product/product.controller';
import { AppEnvInterface } from '../environment/app-env.interface';
import { AppEnv } from '../environment/app-env';
import { UserEntity } from '../../components/user/repositories/user.entity';
import { Container } from 'typeorm-typedi-extensions';
import { ProductEntity } from '../../components/product/repositories/product.entity';

export class BootstrapApp { 
    public app: express.Application = {} as express.Application;

    public appEnv: AppEnvInterface = {} as AppEnvInterface;

    constructor() {
        this.appEnv = new AppEnv();
        this.app = express();
        this.initDatabaseConnection();
        this.initMiddlewares();
        
        useExpressServer(this.app, {
          authorizationChecker: async (action: Action, roles: string[]) => {
            // TODO: Implement JWT Token
            const token = action.request.headers['authorization'];
            return true
            },
            controllers: [UserController, ProductController], 
            cors: this.initCORS(),
        });
    }

    private initDatabaseConnection () : void {
        useContainer(Container);
        const {pgDb, pgHost,pgPass, pgUser, pgPort} = this.appEnv;
        const connection: ConnectionOptions = {
            type: "postgres",
            host: pgHost,
            port: pgPort,
            username: pgUser,
            password: pgPass,
            database: pgDb,
            entities: [UserEntity, ProductEntity],
          };
          createConnection(connection);
    }
    private initCORS() : any {
        const { corsEnabled, corsAllowedOrigins } = this.appEnv;
        const cors = corsEnabled
          ? {
              methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
              allowedHeaders: [
                'Authorization',
                'RefreshToken',
                'Content-Type',
                'Accept',
                'Origin',
                'Referer',
                'User-Agent',
                'Authorization',
                'X-NAB-Signature',
                'X-Api-Key',
                'X-Request-Id',
              ],
              exposedHeaders: [
                'Authorization',
                'RefreshToken',
                'X-Api-Key',
                'AccessToken',
                'X-NAB-Signature',
              ],
              origin(origin: string, callback: (error: Error | null, success?: true) => void) {
                if (corsAllowedOrigins === 'all') {
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
    private initRedis () : void {

    }

    private initLogger () : void {

    }

    private initWorkers () : void {

    }

    private initMiddlewares () : void {
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    public startApp () {
        this.app.listen(this.appEnv.port, () => {
            console.log(`Server is running by port: ${this.appEnv.port}`)
        });
    }
}