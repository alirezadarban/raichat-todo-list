import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SigninCommand } from "../commands/impl/singin.command";
import { SignupCommand } from "../commands/impl/signup.command";
import { GetUserQuery } from "../queries/impl/get-user.query";
import {
  SignupInput,
  SigninInput,
  ProfileInput } from '../interfaces/user.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async signup(user:SignupInput): Promise<User> {
    const { username, password } = user;
    return this.commandBus.execute(new SignupCommand(user.username, user.password));
  }

  async signin(user:SigninInput): Promise<User> {
    const { username, password } = user;
    return this.commandBus.execute(new SigninCommand(user.username, user.password));
  }

  async profile(user:ProfileInput): Promise<User> {
    const { id } = user;
    return await this.queryBus.execute(new GetUserQuery(id));
  }
}
