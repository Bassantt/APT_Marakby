import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { sign } from 'jsonwebtoken';
@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signPayload(payload) {
        return (
            'Bearer ' +
            sign(payload, process.env.SECRET_KEY, { expiresIn: '67472347632732h' })
        );
    }
    async validateUser(payload: { _id: String, email: String }) {
        const user = await this.userService.getUserByID(payload._id);
        return user;
    }
}
