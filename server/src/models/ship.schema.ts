import { prop, Ref } from "@typegoose/typegoose";
import { IsString, IsOptional, Length, IsNumber } from 'class-validator';
import { Bookings } from './booking.schema';
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
  blockDates?: {};
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
  /////////////////for party//////////////////////////
  @IsOptional()
  @prop({ options: true })
  partySalary: Number;
  @IsOptional()
  @prop({ options: true })
  soundSalary: Number;
  @IsOptional()
  @prop({ options: true })
  lightSalary: Number;
  @IsOptional()
  @prop({ options: true })
  foodPartySalary: Number;
  @IsOptional()
  @prop({ options: true })
  decorationSalary: Number;
  ////////////////////////for meeting/////////////////////
  @IsOptional()
  @prop({ options: true })
  meetingSalary: Number;
  @IsOptional()
  @prop({ options: true })
  hallSalary: Number;
  @IsOptional()
  @prop({ options: true })
  foodMeetingSalary: Number;
  ////////////////////////for travel /////////////////////
  @IsOptional()
  @prop({ options: true })
  travelSalary: Number;
  @IsOptional()
  @prop({ options: true })
  roomSalary: Number;
  @IsOptional()
  @prop({ options: true })
  foodTravelSalary: Number;
  @IsOptional()
  @prop({ options: true })
  swingSalary: Number;

  @IsOptional()
  @prop({ options: true })
  @IsNumber()
  numberOfHoursPerday?: Number;
  @IsOptional()
  @prop({ options: true })
  offers?: [{ description: string, salary: Number }];
  @prop({ ref: Bookings })
  bookings?: [Ref<Bookings>];
  @IsOptional()
  @prop({ options: true })
  mangerId?: String;
}