import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignupCommand } from '../impl/signup.command';
import { UsersService } from '../../services/users.service';
import * as bcrypt from 'bcrypt';

@CommandHandler(SignupCommand)
export class SignupHandler implements ICommandHandler<SignupCommand> {
  constructor(private readonly usersService: UsersService) {}

  async execute(command: SignupCommand): Promise<void> {
    const { username, password } = command;

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.usersService.createUser({ username, password: hashedPassword });
  }
}