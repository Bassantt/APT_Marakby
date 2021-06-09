import { prop, Ref } from '@typegoose/typegoose';
import { Ship } from './ship.schema';
import { IsString, IsEmail, IsOptional, Length, IsNumber, Min, Max } from 'class-validator';
import { Bookings } from './booking.schema';

export class User {
  @prop({ required: true })
  @Length(2, 30)
  @IsString()
  userName: string;
  @Length(4, 20)
  @IsString()
  @prop({ required: true })
  password: string;
  @IsString()
  @IsEmail()
  @prop({ required: true })
  email: string;
  @prop({ ref: Ship })
  ownShips?: [Ref<Ship>];
  @prop({ required: true })
  @Min(1)
  @Max(3)
  @IsNumber()
  type: number; // 1 as customer, 2 as manager ,3 as admin
  @Length(8, 17)
  @IsString()
  @prop({ options: true })
  @IsOptional()
  Phone?: string;
  @prop({ options: true })
  @IsOptional()
  @Length(7, 30)
  @IsString()
  creditCard?: string;
  @prop({ options: true })
  @IsNumber()
  @prop({ default: 0 })
  rate?: number;
  @prop({ ref: Ship })
  interstedShips?: [Ref<Ship>];
  @prop({ ref: User })
  interstedManagers?: [Ref<User>];
  @prop({ required: true })
  @Length(3, 30)
  @IsString()
  country: string;
  @prop({ ref: Bookings })
  bookings?: [Ref<Bookings>];
}