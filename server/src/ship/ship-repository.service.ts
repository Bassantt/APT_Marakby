import { Ship } from "../models/ship.schema";
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ShipDto } from './dto/create-ship.dto';
import { ModelType } from 'typegoose';
import { InjectModel } from "nestjs-typegoose";
import { BaseRepository } from "../shared/repository/base.service";
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class ShipRepository extends BaseRepository<Ship>  {
    constructor(
        @InjectModel(Ship) private readonly _ShipModel: ModelType<Ship>
    ) {
        super();
        this._Model = _ShipModel;
    }

    async findById(_id: string) {
        if (!ObjectId.isValid(_id)) throw new HttpException('Invalid object id', HttpStatus.FORBIDDEN);
        return await this.findOne({ _id: _id });
    }

    async updateShipData(_id: string, Data: {}) {
        if (!ObjectId.isValid(_id)) throw new HttpException('Invalid object id', HttpStatus.FORBIDDEN);
        return await this.update(_id, Data);
    }

    async createShip(ShipData: ShipDto) {
        return await this.create(ShipData);
    }

    async deleteShip(_id: string) {
        return await this.delete(_id);
    }

    async deleteShips(selector: {}) {
        return await this.deleteMany(selector);
    }


}