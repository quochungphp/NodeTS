import { AppEnv } from "../environment/app-env"
import supertest from "supertest";
import express from "express";
import { BootstrapApp } from "../bootstrap-app/bootstrap-app";
interface ITestSetup {
    envConfig: AppEnv,
    request: supertest.SuperTest<supertest.Test>;

}
export const TestSetup = () : ITestSetup => {
    const app = new BootstrapApp().getApp();
    return {
        envConfig : new AppEnv(),
        request: supertest(app)
    }
}
