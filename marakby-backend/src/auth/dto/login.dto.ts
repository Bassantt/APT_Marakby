import { Length, IsEmail, IsString } from "class-validator";
export class LoginDto {
  @Length(4, 12)
  @IsString()
  password: string;
  @IsEmail()
  email: string;
}

