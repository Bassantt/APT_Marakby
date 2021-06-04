import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user-repository.service';
import { UserController } from './user.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { User } from "../models/user.schema";
import { Ship } from "../models/ship.schema";
import { Bookings } from "../models/booking.schema";
import { SharedModule } from '../shared/shared.module'
@Module({
  imports: [SharedModule, SharedModule,
    TypegooseModule.forFeature([User]),
    TypegooseModule.forFeature([Bookings]),
    TypegooseModule.forFeature([Ship])],
  providers: [
    UserService,
    UserRepository
  ],
  controllers: [UserController]
})
export class UserModule { }
