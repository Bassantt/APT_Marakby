import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ShipModule } from './ship/ship.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TypegooseModule.forRoot(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
    }),
    AuthModule,
    UserModule,
    SharedModule,
    ShipModule
  ],
  controllers: [],
  providers: [],

}) export class AppModule { }
