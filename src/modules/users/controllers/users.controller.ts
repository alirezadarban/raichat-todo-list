import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { SignupCommand } from "../commands/impl/signup.command";
import { SigninCommand } from "../commands/impl/singin.command";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import { SignupDto } from "../dtos/signup.dto";
import { SigninDto } from "../dtos/signin.dto";
import { UsersService } from "../services/users.service"

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ){}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    await this.usersService.signup(signupDto);
    return { message: 'User registered successfully' };
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    const token = await this.usersService.signin(signinDto);
    return { accessToken: token };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any) {
    const id = req.user.id;
    return this.usersService.profile(id);
  }
}
