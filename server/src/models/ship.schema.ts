import { prop } from "@typegoose/typegoose";
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, Length, IsNumber } from 'class-validator';

export class Ship {
  @Length(2, 30)
  @IsString()
  @prop({ required: true })
  name: string;
  @IsOptional()
  @prop({ options: true })
  @IsOptional()
  description?: string;
  @IsOptional()
  @prop({ options: true })
  blockDates?: [Date];
  @IsOptional()
  @prop({ options: true })
  salaryPerHour?: Number;
  @IsOptional()
  @prop({ options: true })
  location?: string;
  @IsOptional()
  @IsString()
  @prop({ options: true })
  country?: string;
  @IsOptional()
  @prop({ options: true })
  @IsNumber()
  capcity?: Number;
  @IsOptional()
  @IsString()
  @prop({ options: true })
  availableFunctions?: [{ salary: Number, discription: string }];
  @IsOptional()
  @prop({ options: true })
  @IsNumber()
  numberOfHoursPerday?: Number;
  @IsOptional()
  @prop({ options: true })
  offers?: [{ description: string, salary: Number }];
}