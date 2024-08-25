import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SigninCommand } from '../impl/singin.command';
import { UsersService } from '../../services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(SigninCommand)
export class SigninHandler implements ICommandHandler<SigninCommand> {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: SigninCommand): Promise<string> {
    const { username, password } = command;
    const user = await this.usersService.findUserByusername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.username, 
      // sub: user._id
     };
    return this.jwtService.sign(payload);
  }
}
