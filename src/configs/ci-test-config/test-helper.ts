/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Connection, ConnectionOptions, createConnection,useContainer } from 'typeorm';
import { Action, useExpressServer } from 'routing-controllers';
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../../components/user/user.controller';
import { ProductController } from '../../components/product/product.controller';
import { AppEnvInterface } from '../environment/app-env.interface';
import { AppEnv } from '../environment/app-env';
import { UserEntity } from '../../components/user/repositories/user.entity';
import { Container } from 'typeorm-typedi-extensions';
import { ProductEntity } from '../../components/product/repositories/product.entity';
import { BootstrapApp } from '../bootstrap-app/bootstrap-app';
import { createServer, Server as HttpServer } from 'http'
import supertest from 'supertest';

export class TestHelper {
    private app: express.Application;
    private server: HttpServer;
    private connection: Connection;


    async setupTestDB() : Promise<Connection>{
        useContainer(Container);
        const {pgDb, pgHost,pgPass, pgUser, pgPort} = new AppEnv();
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

    public async init(): Promise<void> {
        const {port} = this.appConfig;
        this.connection =  await this.setupTestDB();
        this.app = new BootstrapApp().getApp();
        this.server = createServer(this.app).listen(3030);
    }
    public get request(): supertest.SuperTest<supertest.Test> {
        return supertest(this.app);
    }

    public get dbConnection(): Connection {
        return this.connection;
    }

    public get appConfig(): AppEnv{
        return new AppEnv();
    }

    async close(): Promise<void>{
        this.connection.close();
        this.server.close();
    }

}