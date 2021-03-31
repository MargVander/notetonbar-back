import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifiants): Promise<any> {
    const user = await this.userService.findOneToConnect(identifiants.pseudo);
    if (user && user.password === identifiants.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('authservice : ' + user);
    const payload = { pseudo: user.pseudo, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
