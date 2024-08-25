import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from '../impl/update-todo-list.command';
import { Model, Types } from 'mongoose';
import { TodoList, TodoListDocument } from '../../schemas/todo-list.schema';
import { InjectModel } from '@nestjs/mongoose';


@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler implements ICommandHandler<UpdateTodoListCommand> {
    constructor(
        @InjectModel(TodoList.name) private todoListModel: Model<TodoListDocument>
      ) {}

  async execute(command: UpdateTodoListCommand): Promise<TodoList> {
    const { id, userId, title } = command;
    const todoList = await this.todoListModel.findById(id);
    if (!todoList) {
      throw new Error('Todo not found');
    }

    // Ensure the user owns the todo list
    if (todoList.userId.toString() !== userId) {
      throw new Error('Unauthorized');
    }

    todoList.title = title;
    return todoList.save();
  }
}