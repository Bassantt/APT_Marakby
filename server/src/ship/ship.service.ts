import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Ship } from "../models/ship.schema";
import { ShipRepository } from './ship-repository.service';
import { ShipDto } from './dto/create-ship.dto';

@Injectable()
export class ShipService {
    constructor(
        private readonly ShipRepository: ShipRepository
    ) {

    }
    async getShipByID(shipID): Promise<Ship | null> {
        const ship = await this.ShipRepository.findByID(shipID);
        if (!ship)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        return ship;
    }

    async createShip(createShipDto: ShipDto) {
        return await this.ShipRepository.createShip(createShipDto);
    }

    async updateShip(updatedData, shipID) {
        return await this.ShipRepository.updateShipData(shipID, updatedData);
    }

    async addOfferTToShip(shipId, offer: { description: string, salary: Number }) {
        const ship = await this.getShipByID(shipId);
        ship.offers.push(offer);
        await this.updateShip({ offers: ship.offers }, shipId)
    }

    async addFunctionToShip(shipId, new_fun: { salary: Number; discription: string; }) {
        const ship = await this.getShipByID(shipId);
        ship.availableFunctions.push(new_fun);
        await this.updateShip({ availableFunctions: ship.availableFunctions }, shipId)
    }

    async findAllShips(): Promise<Ship[] | null> {
        return await this.ShipRepository.findAll();
    }


    async deleteShip(shipID) {
        const ship = await this.getShipByID(shipID);
        if (!ship)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        await this.ShipRepository.delete(shipID);
    }

}