import { ICommand } from '@nestjs/cqrs';

export class SignupCommand implements ICommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}
