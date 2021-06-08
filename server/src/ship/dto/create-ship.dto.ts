import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, Length, IsNumber } from 'class-validator';
import { Ship } from 'src/models/ship.schema';
export class ShipDto {
  @Length(2, 30)
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  @IsOptional()
  description?: string;
  @IsOptional()
  blockDates?: [Date];
  @IsOptional()
  @IsNumber()
  salaryPerHour?: Number;
  @IsOptional()
  @IsString()
  location?: string;
  @IsOptional()
  @IsString()
  country?: string;
  @IsOptional()
  @IsNumber()
  capcity?: Number;
  @IsOptional()
  availableFunctions?: [{ salary: Number, discription: string }];
  @IsOptional()
  numberOfHoursPerday?: Number;
  @IsOptional()
  offers?: [{ description: string, salary: Number }];

}

