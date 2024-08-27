export class TodoItemDeletedEvent {
  constructor(
    public readonly todoItemId: string,
    public readonly todoListId: string,
  ) {}
}