import { ICommand } from '@nestjs/cqrs';

export class UpdateTodoItemCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly priority: number,
    public readonly userId: string,
  ) {}
}
