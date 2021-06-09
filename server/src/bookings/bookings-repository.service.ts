import { Bookings } from "../models/booking.schema";
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BookingDto } from './dto/create-booking.dto';
import { ModelType } from 'typegoose';
import { InjectModel } from "nestjs-typegoose";
import { BaseRepository } from "../shared/repository/base.service";
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class BookingsRepository extends BaseRepository<Bookings> {
    constructor(
        @InjectModel(Bookings) private readonly _BookingModel: ModelType<Bookings>
    ) {
        super();
        this._Model = _BookingModel;
    }

    async findById(_id: string) {
        if (!ObjectId.isValid(_id)) throw new HttpException('Invalid object id', HttpStatus.FORBIDDEN);
        return await this.findOne({ _id: _id });
    }

    async updateBookingsData(_id: string, Data: {}) {
        if (!ObjectId.isValid(_id)) throw new HttpException('Invalid object id', HttpStatus.FORBIDDEN);
        return await this.update(_id, Data);
    }

    async createBookings(BookingsData: BookingDto) {
        return await this.create(BookingsData);
    }

    async deleteBookings(_id: string) {
        return await this.delete(_id);
    }

    async deleteBookingss(selector: {}) {
        return await this.deleteMany(selector);
    }

}