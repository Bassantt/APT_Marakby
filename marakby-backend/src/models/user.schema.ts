import { prop, Ref } from '@typegoose/typegoose';
import { Ship } from './ship.schema';
import { IsString, IsEmail, IsOptional, Length, IsNumber, } from 'class-validator';

export class User {
  @prop({ required: true })
  @Length(2, 30)
  @IsString()
  userName: string;
  @Length(4, 12)
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
  @Length(1, 3) // 1 as customer, 2 as manager ,3 as admin
  @IsNumber()
  type: number;
  @prop({ required: true })
  @Length(8, 17)
  @IsString()
  Phone: string;
  @prop({ options: true })
  @IsOptional()
  @Length(7, 30)
  @IsString()
  creditCard: string;
  @prop({ required: true })
  @Length(0, 10) // 1 as customer, 2 as manager ,3 as admin
  @IsNumber()
  rate: number;
  @prop({ ref: User })
  interstedManagers?: [Ref<User>];
  @prop({ ref: Ship })
  interstedShips?: [Ref<Ship>];
}