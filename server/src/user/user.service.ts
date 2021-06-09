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
        createUserDto.rate = 0;
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
        if (user.ownShips || user.ownShips != [])
            for (let i = 0; i < user.ownShips.length; i++) {
                const ship = await this.shipRepository.findByID(String(user.ownShips[i]));
                await this.deleteShip(userID, String(user.ownShips[i]), ship.bookings);
                await this.shipRepository.deleteShip(String(user.ownShips[i]));
            }
        if (user.bookings || user.bookings != [])
            for (let i = 0; i < user.bookings.length; i++)
                await this.deleteBookShip(userID, user.bookings[i]);

        await this.userRepository.delete(userID);
    }

    async checkOwner(userID, shipID) {
        const user = await this.getUserByID(userID);
        if (!user || user.type < 2)
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

    async deleteShip(userID, shipID, bookings) {
        const user = await this.checkOwner(userID, shipID);
        var shipIndex = user.ownShips.findIndex(ship => String(ship) == String(shipID));
        user.ownShips.splice(shipIndex, 1);
        await this.userRepository.deleteValueFrommAllShips({ 'interstedShips': shipID });
        if (bookings || bookings != [])
            for (let i = 0; i < bookings.length; i++) {
                await this.userRepository.deleteValueFrommAllShips({ 'bookings': bookings[i] });
                await this.bookingsRepository.deleteBookings(bookings[i]);
            }
        return await this.userRepository.update(userID, { ownShips: user.ownShips });
    }

    async updateMe(userId, updatedData) {
        return await this.userRepository.updateUserData(userId, updatedData);
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
        await this.userRepository.updateUserData(userId, { $inc: { rate: 1 } });
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
            ship.blockDates[bookingData.bookDate] = [{ from: 0, to: Number(bookingData.fromHour) }, { from: Number(bookingData.endHour), to: 24 }];
        await this.shipRepository.updateShipData(shipId, { blockDates: ship.blockDates });
        console.log(ship.blockDates[bookingData.bookDate]);


    }

    async getMyBooking(userId) {
        const user = await this.getUserByID(userId);
        return await this.getBookingsData(user.interstedShips, user.bookings);
    }
    async getBookingsData(ships, bookings) {
        var bookings_data = [];
        if (!ships || !bookings || bookings == [] || ships == [])
            return [];
        for (let i = 0; i < bookings.length; i++) {
            console.log(bookings[i], ships[i])
            bookings_data.push({
                "bookingDetails": await this.bookingsRepository.findByID(bookings[i]),
                "ship": await this.shipRepository.findByID(ships[i])
            });
        }
        return bookings_data;
    }
    async deleteBookShip(userId, bookingId) {
        const user = await this.getUserByID(userId);
        const booking = await this.bookingsRepository.findByID(bookingId);
        var index = -2;
        if (!user.bookings && user.bookings == [])
            throw new HttpException('this booking is not belogs to you', HttpStatus.BAD_REQUEST);
        index = user.bookings.findIndex(booking => String(booking) == String(bookingId));
        const shipId = user.interstedShips[index];
        await this.userRepository.deleteValueFrommAllShips({ 'bookings': bookingId });
        await this.shipRepository.deleteValueFrommAllShips({ 'bookings': bookingId });
        await this.userRepository.deleteValueFrommAllShips({ 'interstedShips': user.interstedShips[index] });
        await this.userRepository.updateUserData(userId, { $dec: { rate: 1 } });
        const ship = await this.shipRepository.findByID(String(shipId));
        ship.blockDates[booking.bookDate].push({ from: booking.fromHour, to: booking.endHour });
        await this.shipRepository.updateShipData(String(shipId), { blockDates: ship.blockDates });
        await this.bookingsRepository.deleteBookings(bookingId);
    }

}

