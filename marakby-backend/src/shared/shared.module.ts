import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from "../models/user.schema";
import { Item } from "../models/item.schema";
import { TypegooseModule } from "nestjs-typegoose";
import { UserRepository } from '../user/user-repository.service';

@Module({
    imports: [
        TypegooseModule.forFeature([Item]),
        TypegooseModule.forFeature([User]),
    ],
    providers: [
        UserService,
        UserRepository
    ]
})
export class SharedModule { }
