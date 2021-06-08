import { Length, IsEmail, IsString, IsNumber, Min, Max } from "class-validator";
export class RegisterDto {
  @Length(2, 20)
  @IsString()
  userName: string;
  @Length(4, 20)
  @IsString()
  password: string;
  @IsEmail()
  email: string;
  // 1 as customer, 2 as manager ,3 as admin
  @IsNumber()
  @Min(1)
  @Max(3)
  @IsNumber()
  type: number;
  @Length(3, 30)
  @IsString()
  country: string;
}
