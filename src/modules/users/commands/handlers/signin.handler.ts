import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SigninCommand } from '../impl/singin.command';
import { User } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@CommandHandler(SigninCommand)
export class SigninHandler implements ICommandHandler<SigninCommand> {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: SigninCommand): Promise<string> {
    const { username, password } = command;

    const user = await this.userRepository.findOne({
      where: { username },
    });

    console.log(">>>>..", user)

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('Invalid credentials');
    }

    const payload = {
      id: user.id
    };

    return this.jwtService.sign(payload);
  }
}
