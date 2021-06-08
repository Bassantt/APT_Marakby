import { Module } from '@nestjs/common';
import { ShipService } from '../ship/ship.service';
import { UserService } from '../user/user.service';
import { User } from "../models/user.schema";
import { Ship } from "../models/ship.schema";
import { Bookings } from "../models/booking.schema";
import { TypegooseModule } from "nestjs-typegoose";
import { UserRepository } from '../user/user-repository.service';
import { ShipRepository } from '../ship/ship-repository.service';

@Module({
    imports: [
        TypegooseModule.forFeature([Ship]),
        TypegooseModule.forFeature([Bookings]),
        TypegooseModule.forFeature([User]),
    ],
    providers: [
        UserService,
        UserRepository,
        ShipRepository,
        ShipService
    ]
})
export class SharedModule { }
