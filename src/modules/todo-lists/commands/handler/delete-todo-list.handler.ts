import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList, TodoListDocument } from '../../schemas/todo-list.schema';
import { DeleteTodoListCommand } from '../impl/delete-todo-list.command';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler implements ICommandHandler<DeleteTodoListCommand> {
  constructor(
    @InjectModel(TodoList.name) private readonly todoListModel: Model<TodoListDocument>,
  ) {}

  async execute(command: DeleteTodoListCommand): Promise<void> {
    const { id, userId } = command;
    const todo = await this.todoListModel.findById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }

    if (todo.userId.toString() !== userId.toString()) {
      throw new Error('Unauthorized');
    }

    await this.todoListModel.findByIdAndDelete(id);
  }
}
