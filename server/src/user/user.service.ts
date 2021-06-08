import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from "../models/user.schema";
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user-repository.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { ShipDto } from '../ship/dto/create-ship.dto';
import { ShipRepository } from '../ship/ship-repository.service';

@Injectable()
export class UserService {
    constructor(
        private readonly UserRepository: UserRepository,
        private readonly shipRepository: ShipRepository
    ) {

    }
    async getUserByID(userID): Promise<User | null> {
        const user = await this.UserRepository.findByID(userID);
        if (!user)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        return user;
    }

    async createUser(createUserDto: RegisterDto) {
        if (await this.UserRepository.findByEmail(createUserDto.email))
            throw new HttpException('"email" should not have acount', HttpStatus.FORBIDDEN,);
        const salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = hash;
        return await this.UserRepository.createUser(createUserDto);
    }

    async findByLogin(loginDto: LoginDto) {
        const user = await this.UserRepository.findByEmail(loginDto.email);
        if (!user)
            throw new HttpException('not user by this email', HttpStatus.FORBIDDEN);
        if (await bcrypt.compare(loginDto.password, user.password)) return user;
        throw new HttpException('password is not correct', HttpStatus.FORBIDDEN);

    }

    async findAllUsers(): Promise<User[] | null> {
        return await this.UserRepository.findAll();
    }



    async deleteUser(userID) {
        const user = await this.getUserByID(userID);
        if (!user)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        await this.UserRepository.delete(userID);
    }

    async checkOwner(userID, shipID) {
        const user = await this.getUserByID(userID);
        if (!user || user.type != 2)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        if (!user.ownShips || !user.ownShips.find(ship => String(ship) == String(shipID)))
            throw new HttpException('you dont have this ship', HttpStatus.UNAUTHORIZED);
        else
            return user;
    }

    async getUserShips(userID) {
        const user = await this.getUserByID(userID);
        if (!user || user.type != 2)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        if (!user.ownShips)
            throw new HttpException('you dont have ships', HttpStatus.UNAUTHORIZED);

    }

    async checkUserIsManager(userID) {
        const user = await this.getUserByID(userID);
        if (!user || user.type != 2)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        return user;
    }

    async addShipToManager(user, shipID) {
        user.ownShips.push(shipID);
        return await this.UserRepository.update(user._id, { ownShips: user.ownShips });
    }

    async deleteShip(userID, shipID) {
        const user = await this.checkOwner(userID, shipID);
        var shipIndex = user.ownShips.findIndex(ship => String(ship) == String(shipID));
        user.ownShips.splice(shipIndex, 1)
        return await this.UserRepository.update(userID, { ownShips: user.ownShips });
    }

    async createShip(userID, ship: ShipDto) {
        const user = await this.checkUserIsManager(userID);
        const shipCreated = await this.shipRepository.createShip(ship)
        if (!shipCreated)
            throw new HttpException('can not add ship', HttpStatus.BAD_REQUEST);
        await this.addShipToManager(user, shipCreated._id)
    }
}

