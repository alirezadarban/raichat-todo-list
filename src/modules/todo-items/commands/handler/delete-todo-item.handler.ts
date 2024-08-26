import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem, TodoItemDocument } from '../../schemas/todo-item.schema';
import { DeleteTodoItemCommand } from '../impl/delete-todo-item.command';

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler implements ICommandHandler<DeleteTodoItemCommand> {
  constructor(
    @InjectModel(TodoItem.name) private readonly todoItemModel: Model<TodoItemDocument>,
  ) {}

  async execute(command: DeleteTodoItemCommand): Promise<void> {
    const { id, userId } = command;
    const todo = await this.todoItemModel.findById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }

    // if (todo.userId.toString() !== userId.toString()) {
    //   throw new Error('Unauthorized');
    // }

    await this.todoItemModel.findByIdAndDelete(id);
  }
}
