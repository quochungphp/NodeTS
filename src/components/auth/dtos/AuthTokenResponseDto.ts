export class AuthAccessTokenResponseDto {
  sessionId!: string | null;

  id!: string;

  email!: string;

  fullName!: string;

  provider!: string | null;

  providerId?: string | null;

  phone!: string | null;

  birthday!: Date | null;

  avatar!: string | null;

  postCode!: string | null;

  status!: string | null;

  role!: string | null;

  address!: string | null;

  createdAt!: Date | string | null;

  updateAt!: Date | string | null;

  iat?: number;

  exp?: number;
}
