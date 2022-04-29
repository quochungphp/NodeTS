export class AuthRefreshTokenResponseDto {
  id!: string;

  sessionId!: string;

  iat?: number;

  exp?: number;
}
