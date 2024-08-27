import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem, TodoItemDocument } from '../../schemas/todo-item.schema';
import { DeleteTodoItemCommand } from '../impl/delete-todo-item.command';
import { NotFoundException } from "@nestjs/common";
import { TodoListsService } from "../../../todo-lists/services/todo-lists.service";
import { TodoItemDeletedEvent } from "../../events/impl/todo-item-deleted.event";

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler implements ICommandHandler<DeleteTodoItemCommand> {
  constructor(
    @InjectModel(TodoItem.name)
    private readonly todoItemModel: Model<TodoItemDocument>,
    private readonly todoListService: TodoListsService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteTodoItemCommand): Promise<TodoItem> {
    const { id, userId } = command;
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

    await this.todoItemModel.findByIdAndDelete(id);

    this.eventBus.publish(new TodoItemDeletedEvent(todoItem.id, todoItem.todoListId.toString()));

    return todoItem;
  }
}
