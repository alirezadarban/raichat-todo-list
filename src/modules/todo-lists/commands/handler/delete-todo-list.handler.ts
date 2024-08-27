import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList, TodoListDocument } from '../../schemas/todo-list.schema';
import { DeleteTodoListCommand } from '../impl/delete-todo-list.command';
import { TodoListDeletedEvent } from "../../events/impl/todo-list-deleted.event";

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler implements ICommandHandler<DeleteTodoListCommand> {
  constructor(
    @InjectModel(TodoList.name)
    private readonly todoListModel: Model<TodoListDocument>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteTodoListCommand): Promise<void> {
    const { id, userId } = command;
    const todoList = await this.todoListModel.findById(id);
    if (!todoList) {
      throw new Error('Todo not found');
    }

    if (todoList.userId.toString() !== userId.toString()) {
      throw new Error('Unauthorized');
    }

    await this.todoListModel.findByIdAndDelete(id);

    this.eventBus.publish(new TodoListDeletedEvent(todoList.id, userId));
  }
}
