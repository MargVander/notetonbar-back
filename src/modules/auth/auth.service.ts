import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private UserService: UserService,
        private jwtService: JwtService) { }

    async validateUser(mail: string, pass: string): Promise<any> {
        const user = await this.UserService.findOneToConnect(mail);
        const isMatch = await bcrypt.compare(pass, user.password);

        if (user && isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { pseudo: user.pseudo, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            expire_in: Date.now() + (3600 * 2),
            id: user.id

        };
    }

}
