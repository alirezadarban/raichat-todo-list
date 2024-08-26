import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from '../impl/update-todo-item.command';
import { Model, Types } from 'mongoose';
import { TodoItem, TodoItemDocument } from '../../schemas/todo-item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from "@nestjs/common";
import { TodoListsService } from "../../../todo-lists/services/todo-lists.service";


@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler implements ICommandHandler<UpdateTodoItemCommand> {
    constructor(
        @InjectModel(TodoItem.name)
        private todoItemModel: Model<TodoItemDocument>,
        private readonly todoListService: TodoListsService
      ) {}

  async execute(command: UpdateTodoItemCommand): Promise<TodoItem> {
    const {
        id,
        title,
        description,
        priority,
        userId} = command;
    const todoItem = await this.todoItemModel.findById(id);
    if (!todoItem) {
      throw new Error('Todo not found');
    }

    const todoList = await this.todoListService.findById(todoItem.todoListId.toString());
    if (!todoList) {
      throw new NotFoundException('Todo list not found');
    }

    if (todoList.userId.toString() !== userId) {
      throw new Error('Unauthorized');
    }

    todoItem.title = title ? title : todoItem.title;
    todoItem.description = description ? description : todoItem.description;
    todoItem.priority = priority ? priority :todoItem.priority;
    return todoItem.save();
  }
}