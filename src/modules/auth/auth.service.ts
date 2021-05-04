import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private UserService: UserService,
        private jwtService: JwtService) { }
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.UserService.findOneToConnect(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { pseudo: user.pseudo, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    Mail(mail: any) {
        return this.UserService.findMail(mail.mail);
    }
}