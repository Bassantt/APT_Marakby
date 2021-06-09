import { User } from "../models/user.schema";
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { ModelType } from 'typegoose';
import { InjectModel } from "nestjs-typegoose";
import { BaseRepository } from "../shared/repository/base.service";
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class UserRepository extends BaseRepository<User>  {
    constructor(
        @InjectModel(User) private readonly _userModel: ModelType<User>
    ) {
        super();
        this._Model = _userModel;
    }

    async findByEmail(email: string) {
        return await this.findOne({ email: email });
    }

    async updateUserData(userID, Data) {
        if (!ObjectId.isValid(userID)) throw new HttpException('Invalid object id', HttpStatus.FORBIDDEN);
        return await this.update(userID, Data);
    }

    async createUser(userData: RegisterDto) {
        return await this.create(userData);
    }

    async addBooking(userId, bookingId) {
        return await this.pushInArray(userId, { $push: { bookings: bookingId } });
    }

    async updateArrayDataInUser(userId, Data) {
        return await this.pushInArray(userId, { $push: Data });
    }


}