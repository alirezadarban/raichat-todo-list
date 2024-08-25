import { ICommand } from '@nestjs/cqrs';

export class UpdateTodoListCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly title: string,
  ) {}
}
