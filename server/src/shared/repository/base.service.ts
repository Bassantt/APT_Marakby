import { HttpException, HttpStatus } from '@nestjs/common';
import { IRead } from './IRead'
import { IWrite } from './IWrite'
import { ModelType } from 'typegoose';
const ObjectId = require('mongoose').Types.ObjectId;

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T>  {

    _Model: ModelType<T>;

    async findOne(files: {}) {
        return await this._Model.findOne(files);
    }
    async findByID(id: string) {
        if (!ObjectId.isValid(id)) throw new HttpException('Invalid object id', HttpStatus.FORBIDDEN);
        return await this.findOne({ _id: id });
    }
    async findAll() {
        return await this._Model.find().exec();
    }

    async find(files: {}) {
        return await this._Model.find(files).exec();
    }

    async create(CreateObject: T) {
        const createdUser = new this._Model(CreateObject);
        await createdUser.save();
        return createdUser;
    }

    async update(id, updateInfo: {}) {
        if (await this._Model.updateOne({ _id: id }, updateInfo))
            return true;
        return false;
    }

    async delete(id) {
        if (await this._Model.findOneAndDelete({ _id: id }))
            return true;
        return false;
    }

    async deleteMany(selector: {}) {
        if (await this._Model.deleteMany(selector))
            return true;
        return false;
    }

}