import { ICommand } from '@nestjs/cqrs';

export class DeleteTodoListCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
