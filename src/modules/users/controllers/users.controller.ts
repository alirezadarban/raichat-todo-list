import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { SignupCommand } from "../commands/impl/signup.command";
import { SigninCommand } from "../commands/impl/singin.command";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import { UsersService } from "../services/users.service";
import { SignupDto } from "../dtos/signup.dto";
import { SigninDto } from "../dtos/signin.dto";

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly usersService: UsersService
  ){}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    await this.commandBus.execute(new SignupCommand(signupDto.username, signupDto.password));
    return { message: 'User registered successfully' };
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    const token = await this.commandBus.execute(new SigninCommand(signinDto.username, signinDto.password));
    return { accessToken: token };
  }

  @Get('profile')  // Route to get user info
  @UseGuards(JwtAuthGuard)  // Protect the route with JWT AuthGuard
  async getProfile(@Request() req) {
    return this.usersService.findUserByusername('Alireza');
  }
}
