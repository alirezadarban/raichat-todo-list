import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignupCommand } from '../commands/impl/signup.command';
import { SigninCommand } from '../commands/impl/singin.command';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly usersService: UsersService
  ){}

  @Post('signup')
  async signup(@Body() body: { username: string; password: string; }) {
    await this.commandBus.execute(new SignupCommand(body.username, body.password));
    return { message: 'User registered successfully' };
  }

  @Post('signin')
  async signin(@Body() body: { username: string; password: string }) {
    const token = await this.commandBus.execute(new SigninCommand(body.username, body.password));
    return { accessToken: token };
  }

  @Get('profile')  // Route to get user info
  @UseGuards(JwtAuthGuard)  // Protect the route with JWT AuthGuard
  async getProfile(@Request() req) {
    console.log('>>>>', typeof req.user.username, " <<< ", req.user.username)
    const user = await this.usersService.findUserByusername('Alireza');
    console.log('oooooooo', user);
    return user;
  }
}
