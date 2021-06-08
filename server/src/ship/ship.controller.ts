import { Controller, UseGuards, Get, Put, Request, Param, Body, Post, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ShipDto } from './dto/create-ship.dto';
import { ShipService } from './Ship.service';
import { UserService } from '../user/user.service';
import { Ship } from "../models/Ship.schema";

@Controller('')
export class ShipController {
    constructor(
        private shipService: ShipService,
        private userService: UserService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('/me/ships')
    async myShips(@Request() req) {
        const ships = await this.userService.getUserShips(req.user._id);
        const ships_data = await this.shipService.getShipByID(ships); // get ships by arry of ids
        return { ships_data };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/me/ships')
    async createShips(@Request() req, @Body() ship_data: ShipDto) {
        await this.userService.createShip(req.user._id, ship_data)
        return;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/me/ships/:_id')
    async updateShip(@Param('_id') ShipId: string, @Request() req, @Body() data: {}) {
        await this.userService.checkOwner(req.user._id, ShipId);
        await this.shipService.updateShip(data, ShipId);
        return;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/me/ships/:_id/offers')
    async updateShipOffers(@Param('_id') ShipId: string, @Request() req, @Body() offer: { description: string, salary: Number }) {
        await this.userService.checkOwner(req.user._id, ShipId);
        await this.shipService.addOfferTToShip(req.user._id, offer);
        return;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/me/ships/:_id/functions')
    async updateShipFunctions(@Param('_id') ShipId: string, @Request() req, @Body() newFunction: { salary: Number; discription: string; }) {
        await this.userService.checkOwner(req.user._id, ShipId);
        await this.shipService.addFunctionToShip(ShipId, newFunction);
        return;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/me/ships/:_id')
    async deleteShip(@Param('_id') ShipId: string, @Request() req) {
        await this.userService.checkOwner(req.user._id, ShipId);
        await this.shipService.deleteShip(ShipId);
        await this.userService.deleteShip(req.user._id, ShipId);
        return;

    }

    @Get('Ships')
    async all(): Promise<Ship[] | null> {
        return await this.shipService.findAllShips();
    }

}
