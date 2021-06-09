import { Controller, Get, Post, Body, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import { Email } from './send-email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
    constructor(private readonly userService: UserService,
        private readonly email: Email,
        private readonly authService: AuthService) { }

    @Post('/sign-up')
    async create(@Body() user: RegisterDto) {
        const createdUser = await this.userService.createUser(user);
        if (!createdUser) throw new Error('user not found');
        //        this.email.sendEmail(createdUser.email, "", 'confirm', createdUser.userName);
        const token = await this.authService.signPayload({ _id: createdUser._id });
        createdUser.password = null;
        return { token, createdUser };
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.userService.findByLogin(loginDto);
        if (!user) throw new Error('user not found');
        const token = await this.authService.signPayload({ _id: user._id, });
        user.password = null;
        user.type = Number(loginDto.type);
        return { token, user };
    }

    // should takeToken not body param
    @UseGuards(AuthGuard('jwt'))
    @Delete('/me/delete')
    async delete(@Request() req) {
        const user = await this.userService.getUserByID(req.user._id);
        await this.userService.deleteUser(req.user._id);
        // this.email.sendEmail(user.email, "", "Delete account", user.userName);
        return;
    }

}