import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Ship } from "../models/ship.schema";
import { ShipRepository } from './ship-repository.service';
import { ShipDto } from './dto/create-ship.dto';
import * as search from 'fuzzy-search';
@Injectable()
export class ShipService {
    constructor(
        private readonly ShipRepository: ShipRepository
    ) {

    }
    async getShipByID(shipID): Promise<Ship | null> {
        const ship = await this.ShipRepository.findByID(shipID);
        if (!ship)
            throw new HttpException('not found ship', HttpStatus.BAD_REQUEST);
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

    /*async addFunctionToShip(shipId, new_fun: { salary: Number; discription: string; }) {
        const ship = await this.getShipByID(shipId);
        ship.availableFunctions.push(new_fun);
        await this.updateShip({ availableFunctions: ship.availableFunctions }, shipId)
    }*/

    async findAllShips(): Promise<Ship[] | null> {
        return await this.ShipRepository.findAll();
    }


    async deleteShip(shipID) {
        const ship = await this.getShipByID(shipID);
        if (!ship)
            throw new HttpException('not a ship', HttpStatus.UNAUTHORIZED);
        await this.ShipRepository.delete(shipID);
        return ship.bookings;
    }

    async getShipsByID(ships) {
        const shipsData = [];
        for (let i = 0; i < ships.length; i++) {
            const ship = await this.getShipByID(ships[i]);
            shipsData.push(ship);
        }
        return shipsData;
    }

    async searchForShipByCountry(country) {
        return await this.ShipRepository.findByCountry(country);
    }

    async searchForShipByname(name) {
        const ships = await this.ShipRepository.findByName(name);
        if (ships && ships.length != 0)
            return ships;
        var fuzzy_serch = await this.ShipRepository.findAll();
        return await this.Fuzzy(fuzzy_serch, ['name', 'description'], name);
    }

    async Fuzzy(
        model, params: Array<string>,
        name: string,
    ) {
        const searcher = new search(model, params, {
            caseSensitive: false,
            sort: true,
        });
        let result = searcher.search(name);
        if (result.length == 0) {
            throw new NotFoundException()
        }
        return { result };
    }

}