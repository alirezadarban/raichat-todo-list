import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateTodoItemCommand } from '../impl/create-todo-item.command';
import { Model, Types } from 'mongoose';
import { TodoItem, TodoItemDocument } from '../../schemas/todo-item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { TodoListsService } from "../../../todo-lists/services/todo-lists.service";
import { NotFoundException } from "@nestjs/common";
import { TodoItemCreatedEvent } from "../../events/impl/todo-item-created.event";

@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler implements ICommandHandler<CreateTodoItemCommand> {
  constructor(
    // private readonly todoItemRepository: TodoItemRepository,
    @InjectModel(TodoItem.name)
    private todoItemModel: Model<TodoItemDocument>,
    private readonly todoListService: TodoListsService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTodoItemCommand): Promise<TodoItem> {
    const {
      title,
      description,
      priority,
      todoListId,
      userId} = command;
    
    const todoList = await this.todoListService.findById(todoListId);
    if (!todoList) {
      throw new NotFoundException('Todo list not found');
    }

    if (todoList.userId.toString() !== userId) {
      throw new Error('Unauthorized');
    }

    const newTodoItem =
      new this.todoItemModel(
        {
          title,
          description,
          priority,
          todoListId: new Types.ObjectId(todoListId)});

    const todoItem = await newTodoItem.save();

    this.eventBus.publish(new TodoItemCreatedEvent(todoItem.id, todoListId));

    return todoItem;
  }
}
