import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from "../models/user.schema";
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user-repository.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { ShipDto } from '../ship/dto/create-ship.dto';
import { ShipRepository } from '../ship/ship-repository.service';
import { BookingDto } from 'src/bookings/dto/create-booking.dto';
import { BookingsRepository } from '../bookings/bookings-repository.service';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly shipRepository: ShipRepository,
        private readonly bookingsRepository: BookingsRepository
    ) {

    }
    async getUserByID(userID): Promise<User | null> {
        const user = await this.userRepository.findByID(userID);
        if (!user)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        return user;
    }

    async createUser(createUserDto: RegisterDto) {
        if (await this.userRepository.findByEmail(createUserDto.email))
            throw new HttpException('"email" should not have acount', HttpStatus.FORBIDDEN,);
        const salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = hash;
        return await this.userRepository.createUser(createUserDto);
    }

    async findByLogin(loginDto: LoginDto) {
        const user = await this.userRepository.findByEmail(loginDto.email);
        if (!user)
            throw new HttpException('not user by this email', HttpStatus.FORBIDDEN);
        if (!await bcrypt.compare(loginDto.password, user.password))
            throw new HttpException('password is not correct', HttpStatus.FORBIDDEN);
        if (user.type < loginDto.type)
            throw new HttpException('your type is not correct', HttpStatus.FORBIDDEN);
        return user;
    }

    async findAllUsers(): Promise<User[] | null> {
        return await this.userRepository.findAll();
    }



    async deleteUser(userID) {
        const user = await this.getUserByID(userID);
        if (!user)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        await this.userRepository.delete(userID);
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
        if (!user || user.type < 2)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        if (!user.ownShips)
            throw new HttpException('you dont have ships', HttpStatus.UNAUTHORIZED);
        return user.ownShips;

    }

    async checkUserIsManager(userID) {
        const user = await this.getUserByID(userID);
        if (!user || user.type < 2)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        return user;
    }

    async addShipToManager(user, shipID) {
        user.ownShips.push(shipID);
        return await this.userRepository.update(user._id, { ownShips: user.ownShips });
    }

    async deleteShip(userID, shipID) {
        const user = await this.checkOwner(userID, shipID);
        var shipIndex = user.ownShips.findIndex(ship => String(ship) == String(shipID));
        user.ownShips.splice(shipIndex, 1)
        return await this.userRepository.update(userID, { ownShips: user.ownShips });
    }

    async createShip(userID, ship: ShipDto) {
        const user = await this.checkUserIsManager(userID);
        const shipCreated = await this.shipRepository.createShip(ship)
        if (!shipCreated)
            throw new HttpException('can not add ship', HttpStatus.BAD_REQUEST);
        await this.addShipToManager(user, shipCreated._id)
    }

    async bookShip(userId, shipId, bookingData: BookingDto) {
        const ship = await this.shipRepository.findByID(shipId);
        if (!ship)
            throw new HttpException('this ship is not found', HttpStatus.BAD_REQUEST);
        var index = -2;
        if (!ship.blockDates || ship.blockDates == []) ship.blockDates = {};
        if (ship.blockDates[bookingData.bookDate]) {
            index = ship.blockDates[bookingData.bookDate].findIndex(range => Number(range.from) >= Number(bookingData.fromHour) && Number(range.to) <= Number(bookingData.endHour))
            if (!(index >= 0))
                throw new HttpException('this time ship is not available', HttpStatus.BAD_REQUEST);
        }
        const booking = await this.bookingsRepository.createBookings(bookingData);
        // await this.bookingsRepository.updateBookingsData(booking._id, { user: userId, ship: shipId });
        await this.userRepository.addBooking(userId, booking._id);
        await this.userRepository.updateArrayDataInUser(userId, { interstedShips: shipId });
        await this.shipRepository.addBooking(shipId, booking._id);
        if (index >= 0) {
            const currentRang = ship.blockDates[bookingData.bookDate][index];
            ship.blockDates[bookingData.bookDate].splice(index, 1);
            if (currentRang.from != bookingData.fromHour && currentRang.to != bookingData.endHour) {
                ship.blockDates[bookingData.bookDate].push({ from: currentRang.from, to: Number(bookingData.fromHour) });
                ship.blockDates[bookingData.bookDate].push({ from: Number(bookingData.endHour), to: currentRang.to });
            }
            else if (currentRang.from == bookingData.fromHour && currentRang.to != bookingData.endHour)
                ship.blockDates[bookingData.bookDate].push({ from: Number(bookingData.endHour), to: currentRang.to });
            else if (currentRang.from != bookingData.fromHour && currentRang.to == bookingData.endHour)
                ship.blockDates[bookingData.bookDate].push({ from: Number(bookingData.endHour), to: currentRang.to });
        }
        else
            ship.blockDates[bookingData.bookDate] = [{ from: 0, to: Number(bookingData.fromHour) - 1 }, { from: Number(bookingData.endHour) + 1, to: 24 }];
        await this.shipRepository.updateShipData(shipId, { blockDates: ship.blockDates });
        console.log(ship.blockDates[bookingData.bookDate]);


    }

    async getMyBooking(userId) {
        const user = await this.getUserByID(userId);
        var bookings = [];
        const bookings_ids = user.bookings;

        return await this.getBookingsData(user.interstedShips, user.bookings);
    }
    async getBookingsData(ships, bookings) {
        var bookings_data = [];
        if (!ships || !bookings || bookings == [] || ships == [])
            return [];
        for (let i = 0; i < bookings.length; i++)
            bookings_data.push({
                "bookingDetails": await this.bookingsRepository.findByID(bookings[i]),
                "shipId": await this.shipRepository.findByID(ships[i])
            });
    }
    /*
        async deleteBookShip(userId, bookingId) {
            const ship = await this.shipRepository.findByID(shipId);
            if (!ship)
                throw new HttpException('this ship is not found', HttpStatus.BAD_REQUEST);
            var index = -2;
            if (!ship.blockDates || ship.blockDates == []) ship.blockDates = {};
            if (ship.blockDates[bookingData.bookDate]) {
                index = ship.blockDates[bookingData.bookDate].findIndex(range => Number(range.from) >= Number(bookingData.fromHour) && Number(range.to) <= Number(bookingData.endHour))
                if (!(index >= 0))
                    throw new HttpException('this time ship is not available', HttpStatus.BAD_REQUEST);
            }
            const booking = await this.bookingsRepository.createBookings(bookingData);
            // await this.bookingsRepository.updateBookingsData(booking._id, { user: userId, ship: shipId });
            await this.userRepository.addBooking(userId, booking._id);
            await this.userRepository.updateArrayDataInUser(userId, { interstedShips: shipId });
            await this.shipRepository.addBooking(shipId, booking._id);
            if (index >= 0) {
                const currentRang = ship.blockDates[bookingData.bookDate][index];
                ship.blockDates[bookingData.bookDate].splice(index, 1);
                if (currentRang.from != bookingData.fromHour && currentRang.to != bookingData.endHour) {
                    ship.blockDates[bookingData.bookDate].push({ from: currentRang.from, to: Number(bookingData.fromHour) });
                    ship.blockDates[bookingData.bookDate].push({ from: Number(bookingData.endHour), to: currentRang.to });
                }
                else if (currentRang.from == bookingData.fromHour && currentRang.to != bookingData.endHour)
                    ship.blockDates[bookingData.bookDate].push({ from: Number(bookingData.endHour), to: currentRang.to });
                else if (currentRang.from != bookingData.fromHour && currentRang.to == bookingData.endHour)
                    ship.blockDates[bookingData.bookDate].push({ from: Number(bookingData.endHour), to: currentRang.to });
            }
            else
                ship.blockDates[bookingData.bookDate] = [{ from: 0, to: Number(bookingData.fromHour) - 1 }, { from: Number(bookingData.endHour) + 1, to: 24 }];
            await this.shipRepository.updateShipData(shipId, { blockDates: ship.blockDates });
            console.log(ship.blockDates[bookingData.bookDate]);
    
    
        }*/

}

