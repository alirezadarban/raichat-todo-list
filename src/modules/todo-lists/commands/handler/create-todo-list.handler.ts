import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateTodoListCommand } from '../impl/create-todo-list.command';
// import { TodoListRepository } from '../../repositories/todo-list.repository';
import { Model, Types } from 'mongoose';
import { TodoList, TodoListDocument } from '../../schemas/todo-list.schema';
import { InjectModel } from '@nestjs/mongoose';
import { TodoListCreatedEvent } from "../../events/impl/todo-list-created.event";

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(
    // private readonly todoListRepository: TodoListRepository,
    @InjectModel(TodoList.name)
    private todoListModel: Model<TodoListDocument>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTodoListCommand): Promise<TodoList> {
    const { userId, title } = command;
    const newTodoList =
      new this.todoListModel(
        { userId: new Types.ObjectId(userId),
          title });

    const todoList = await newTodoList.save();

    this.eventBus.publish(new TodoListCreatedEvent(todoList.id, userId));

    return todoList;
  }
}
