import { IQuery } from '@nestjs/cqrs';

export class GetTodoListQuery implements IQuery {
  constructor(public readonly id: string) {}
}
