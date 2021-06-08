import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { User } from "../models/user.schema";
import { Ship } from "../models/ship.schema";
import { Bookings } from "../models/booking.schema";
import { JwtStrategy } from './jwt.strategy';
import { SharedModule } from '../shared/shared.module';
import { Email } from './send-email.service';
import { UserRepository } from '../user/user-repository.service';
import { ShipRepository } from '../ship/ship-repository.service';
@Module({
  imports: [SharedModule, SharedModule,
    TypegooseModule.forFeature([User]),
    TypegooseModule.forFeature([Bookings]),
    TypegooseModule.forFeature([Ship])
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    Email,
    UserRepository,
    ShipRepository
  ],
  controllers: [AuthController]
})
export class AuthModule { }

