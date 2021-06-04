import { prop, Ref } from "@typegoose/typegoose";
import { Type } from 'class-transformer';
import { Ship } from './ship.schema';
import { User } from './user.schema';
import { IsString, IsOptional, IsDate, Length, IsNumber } from 'class-validator';

export class Bookings {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @prop({ options: true })
  bookDate?: Date;
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
  @IsNumber()
  @Length(1, 24)
  fromHour?: Number;
  @IsOptional()
  @prop({ options: true })
  @IsNumber()
  @Length(1, 24)
  endHour?: Number;
  @prop({ ref: User })
  user?: Ref<User>;
  @prop({ ref: Ship })
  ship?: Ref<Ship>;
}