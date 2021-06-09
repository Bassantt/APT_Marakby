import { Controller, UseGuards, Get, Post, Request, Body, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from "../models/user.schema";
import { BookingDto } from 'src/bookings/dto/create-booking.dto';

@Controller('')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('/me')
    async me(@Request() req) {
        const user = await this.userService.getUserByID(req.user._id);
        user.password = undefined;
        return { user };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/me/book/:ship_id')
    async bookShip(@Request() req, @Body() bookingData: BookingDto, @Param('ship_id') shipId: string) {
        return await this.userService.bookShip(req.user._id, shipId, bookingData);;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/me/book/:booking_id')
    async deletebooking(@Request() req, @Param('booking_id') bookingId: string) {
        return await this.userService.deleteBookShip(req.user._id, bookingId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/me/bookings')
    async getMyBookings(@Request() req) {
        return await this.userService.getMyBooking(req.user._id);

    }

    @Get('users')
    async all(): Promise<User[] | null> {
        return await this.userService.findAllUsers();
    }

}
