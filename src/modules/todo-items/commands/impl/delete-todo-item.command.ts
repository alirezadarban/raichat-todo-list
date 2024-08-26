import { ICommand } from '@nestjs/cqrs';

export class DeleteTodoItemCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
