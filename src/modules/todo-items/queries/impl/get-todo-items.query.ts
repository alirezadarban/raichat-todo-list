import { IQuery } from '@nestjs/cqrs';

export class GetTodoItemsQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
