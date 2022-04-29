/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { Container } from "typeorm-typedi-extensions";
import { sign } from "jsonwebtoken";
import { Inject, Service } from "typedi";
import { AppRequest } from "../../../utils/AppRequest";
import { NotFoundException } from "../../../utils/exceptions/NotFoundException";
import { UserService } from "../../user/services/user.service";
import { AuthRefreshTokenResponseDto } from "../dtos/AuthRefreshTokenResponseDto";
import { AuthSignInResponseDto } from "../dtos/AuthSigninResponseDto";
import { AuthAccessTokenResponseDto } from "../dtos/AuthTokenResponseDto";
import { AppEnv as AppEnvironment } from "../../../configs/environment/app-env";
import { AuthSignInPayloadDto } from "../dtos/AuthSignInPayload.dto";
import { InvalidCredentialsException } from "../../../utils/exceptions/InvalidCredentialsException";
import { verify } from "../../../utils/hashUser";

@Service()
export class AuthSignInAction {
  @Inject() private readonly userService: UserService;

  @Inject() private readonly appEnv: AppEnvironment;

  constructor() {
    this.userService = Container.get(UserService);
    this.appEnv = Container.get(AppEnvironment);
  }

  async execute(
    context: AppRequest,
    payload: AuthSignInPayloadDto,
  ): Promise<AuthSignInResponseDto> {
    const { username, password } = payload;
    const { correlationId } = context;

    const user = await this.userService.findUserByEmail(username);

    if (!user) {
      throw new NotFoundException(
        correlationId,
        "Username and password are not correct",
        "UserNotFound",
      );
    }
    await this.comparePassword(password, user.password || "");

    delete user.password;

    const { jwtSecret, jwtExpiresIn } = this.appEnv;

    const payloadAccessToken: AuthAccessTokenResponseDto = {
      ...(user as any),
      sessionId: correlationId,
    };

    const accessToken = sign(payloadAccessToken, jwtSecret, { expiresIn: jwtExpiresIn });

    const payloadRefreshToken: AuthRefreshTokenResponseDto = {
      id: payloadAccessToken.id,
      sessionId: correlationId,
    };

    const refreshToken = sign(payloadRefreshToken, jwtSecret, { expiresIn: jwtExpiresIn });

    const token: AuthSignInResponseDto = {
      user: payloadAccessToken,
      accessToken,
      refreshToken,
    };

    return token;
  }

  private async comparePassword(password: string, verifyPassword: string): Promise<void> {
    const isComparePassword = await verify(password, verifyPassword);

    if (!isComparePassword) {
      throw new InvalidCredentialsException("Username and password are not correct");
    }
  }
}
