/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import {
  Authorized,
  Body,
  Controller,
  Get,
  JsonController,
  Post,
  QueryParams,
  Req,
} from "routing-controllers";
import Container, { Service, Inject } from "typedi";
import { AppRequest } from "../../utils/AppRequest";
import { AuthSignInPayloadDto } from "./dtos/AuthSignInPayload.dto";
import { AuthSignInAction } from "./servies/AuthSigninAction.service";

@JsonController("/auths")
@Service()
export class AuthController {
  @Inject() private readonly authSignInAction: AuthSignInAction;

  constructor() {
    this.authSignInAction = Container.get(AuthSignInAction);
  }

  @Post("")
  async getAll(@Req() request: AppRequest, @Body() payload: AuthSignInPayloadDto) {
    return this.authSignInAction.execute(request, payload);
  }
}
