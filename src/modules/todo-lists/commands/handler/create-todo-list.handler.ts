import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../impl/create-todo-list.command';
// import { TodoListRepository } from '../../repositories/todo-list.repository';
import { Model, Types } from 'mongoose';
import { TodoList, TodoListDocument } from '../../schemas/todo-list.schema';
import { InjectModel } from '@nestjs/mongoose';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(
    // private readonly todoListRepository: TodoListRepository,
    @InjectModel(TodoList.name) private todoListModel: Model<TodoListDocument>,
  ) {}

  async execute(command: CreateTodoListCommand): Promise<TodoList> {
    const { userId, title } = command;
    const newTodoList = new this.todoListModel(new Types.ObjectId(userId), { title });
    return newTodoList.save();
  }
}
