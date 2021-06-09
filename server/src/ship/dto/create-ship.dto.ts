import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, Length, IsNumber } from 'class-validator';
import { Ship } from 'src/models/ship.schema';
export class ShipDto {
  @Length(2, 30)
  @IsString()
  name: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  blockDates?: {}; // date as a key of array od {from : ,to: } available hours not block
  @IsOptional()
  salaryPerHour?: Number;
  @IsOptional()
  location?: string;
  @IsOptional()
  @IsString()
  country?: string;
  @IsOptional()
  @IsNumber()
  capcity?: Number;
  /////////////////for party//////////////////////////
  @IsOptional()
  partySalary: Number;
  @IsOptional()
  soundSalary: Number;
  @IsOptional()
  lightSalary: Number;
  @IsOptional()
  foodPartySalary: Number;
  @IsOptional()
  decorationSalary: Number;
  ////////////////////////for meeting/////////////////////
  @IsOptional()
  meetingSalary: Number;
  @IsOptional()
  hallSalary: Number;
  @IsOptional()
  foodMeetingSalary: Number;
  ////////////////////////for travel /////////////////////
  @IsOptional()
  travelSalary: Number;
  @IsOptional()
  roomSalary: Number;
  @IsOptional()
  foodTravelSalary: Number;
  @IsOptional()
  swingSalary: Number;
  @IsOptional()
  @IsNumber()
  numberOfHoursPerday?: Number;
  @IsOptional()
  offers?: [{ description: string, salary: Number }];

}

