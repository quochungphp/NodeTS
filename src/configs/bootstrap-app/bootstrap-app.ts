/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { useExpressServer } from 'routing-controllers';
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../../components/user/user.controller';
import { AppEnvInterface } from '../environment/app-env.interface';
import { AppEnv } from '../environment/app-env';
import { UserEntity } from '../../components/user/repositories/user.entity';

export class BootstrapApp { 
    public app: express.Application = {} as express.Application;

    public appEnv: AppEnvInterface = {} as AppEnvInterface;

    constructor() {
        this.appEnv = new AppEnv();
        
        this.app = express();
        this.initDatabaseConnection();
        useExpressServer(this.app, {
            controllers: [UserController], 
        });
    }

    private initDatabaseConnection () : void {
        const {pgDb, pgHost,pgPass, pgUser, pgPort} = this.appEnv;
        const connection: ConnectionOptions = {
            type: "postgres",
            host: pgHost,
            port: pgPort,
            username: pgUser,
            password: pgPass,
            database: pgDb,
            entities: [UserEntity],
          };
          createConnection(connection);
    }
    private initRedis () : void {

    }

    private initLogger () : void {

    }

    private initWorkers () : void {

    }

    private initialMiddleware () : void {

    }

    public startApp () {
        this.app.listen(this.appEnv.port, () => {
            console.log(`Server is running by port: ${this.appEnv.port}`)
        });
    }
}