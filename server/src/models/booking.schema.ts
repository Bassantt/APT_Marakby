import { prop } from "@typegoose/typegoose";
import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class Bookings {
  @IsOptional()
  @prop({ options: true })
  bookDate?: string;
  @IsOptional()
  @prop({ options: true })
  @IsNumber()
  salary?: Number;
  @IsOptional()
  @IsString()
  @prop({ options: true })
  availableFunctions?: [string];
  @IsOptional()
  @prop({ options: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(24)
  fromHour?: Number;
  @IsOptional()
  @prop({ options: true })
  @IsNumber()
  @Min(0)
  @Max(24)
  endHour?: Number;
}