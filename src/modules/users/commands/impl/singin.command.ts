import { ICommand } from '@nestjs/cqrs';

export class SigninCommand implements ICommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}
