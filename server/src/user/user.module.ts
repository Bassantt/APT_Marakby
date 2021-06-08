import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user-repository.service';
import { UserController } from './user.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { User } from "../models/user.schema";
import { Ship } from "../models/ship.schema";
import { Bookings } from "../models/booking.schema";
import { SharedModule } from '../shared/shared.module';
import { ShipRepository } from '../ship/ship-repository.service';

@Module({
  imports: [SharedModule,
    TypegooseModule.forFeature([User]),
    TypegooseModule.forFeature([Bookings]),
    TypegooseModule.forFeature([Ship])],
  providers: [
    UserService,
    UserRepository,
    ShipRepository
  ],
  controllers: [UserController]
})
export class UserModule { }
