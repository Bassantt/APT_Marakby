import { Module } from '@nestjs/common';
import { ShipRepository } from './ship-repository.service';
import { UserService } from '../user/user.service';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';
import { TypegooseModule } from "nestjs-typegoose";
import { Ship } from "../models/ship.schema";
import { User } from "../models/user.schema";
import { Bookings } from "../models/booking.schema";
import { SharedModule } from '../shared/shared.module';
import { UserRepository } from '../user/user-repository.service';
import { BookingsRepository } from '../bookings/bookings-repository.service';

@Module({
  imports: [SharedModule, SharedModule,
    TypegooseModule.forFeature([Ship]),
    TypegooseModule.forFeature([Bookings]),
    TypegooseModule.forFeature([User])],
  providers: [
    ShipService,
    UserService,
    ShipRepository,
    UserRepository,
    BookingsRepository
  ],
  controllers: [ShipController]
})
export class ShipModule { }
