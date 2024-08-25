import { ICommand } from '@nestjs/cqrs';

export class CreateTodoListCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly title: string,
  ) {}
}
