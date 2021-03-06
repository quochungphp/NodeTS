/* eslint-disable import/no-extraneous-dependencies */
import supertest from "supertest";
import { AppEnv as AppEnvironment } from "../environment/app-env";
import { BootstrapApp } from "../bootstrap-app/bootstrap-app";

interface ITestSetup {
  envConfig: AppEnvironment;
  request: supertest.SuperTest<supertest.Test>;
}
export const TestSetup = (): ITestSetup => {
  const app = new BootstrapApp().getApp();
  return {
    envConfig: new AppEnvironment(),
    request: supertest(app),
  };
};
