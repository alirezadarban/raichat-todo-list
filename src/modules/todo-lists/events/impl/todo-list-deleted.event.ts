export class TodoListDeletedEvent {
  constructor(
    public readonly todoListId: string,
    public readonly userId: string,
  ) {}
}