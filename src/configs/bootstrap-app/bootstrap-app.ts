/* eslint-disable @typescript-eslint/no-empty-function */
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { useExpressServer } from 'routing-controllers';
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../../components/user/user.controller';
import { AppEnvInterface } from '../environment/app-env.interface';
import { AppEnv } from '../environment/app-env';
export class BootstrapApp { 
    public app: express.Application = {} as express.Application;

    public appEnv: AppEnvInterface = {} as AppEnvInterface;

    constructor() {
        this.appEnv = new AppEnv();
        this.app = express();
        useExpressServer(this.app, {
            controllers: [UserController], 
        });
    }

    private initDatabaseConnection () : void {

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
        })
    }
}