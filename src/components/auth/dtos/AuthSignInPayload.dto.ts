import { MaxLength, IsString, IsNotEmpty } from "class-validator";

export class AuthSignInPayloadDto {
  @MaxLength(100)
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
