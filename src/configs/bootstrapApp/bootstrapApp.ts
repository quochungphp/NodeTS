/* eslint-disable @typescript-eslint/no-empty-function */

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { useExpressServer } from 'routing-controllers';
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from 'src/components/user/user.controller';
export class BootstrapApp { 
    public app: express.Application = {} as express.Application;
    public port = 3232;

    constructor() {
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
        this.app.listen(this.port, () => {
            console.log(`Server is running by port: ${this.port}`)
        })
    }
}