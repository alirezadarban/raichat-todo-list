import { IQuery } from '@nestjs/cqrs';

export class GetTodoItemQuery implements IQuery {
  constructor(public readonly id: string) {}
}
