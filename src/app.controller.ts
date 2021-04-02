import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  //@UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() logs) {
    console.log(logs);
    //return this.authService.login(logs);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
