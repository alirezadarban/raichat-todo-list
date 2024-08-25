import { IQuery } from '@nestjs/cqrs';

export class GetTodoListsQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
