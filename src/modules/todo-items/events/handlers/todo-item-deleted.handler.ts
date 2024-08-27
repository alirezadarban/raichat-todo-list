import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItemDeletedEvent } from '../impl/todo-item-deleted.event';
import { TodoList, TodoListDocument } from '../../../todo-lists/schemas/todo-list.schema';

@EventsHandler(TodoItemDeletedEvent)
export class TodoItemDeletedHandler implements IEventHandler<TodoItemDeletedEvent> {
  constructor(
    @InjectModel(TodoList.name) private readonly todoListModel: Model<TodoListDocument>,
  ) {}

  async handle(event: TodoItemDeletedEvent) {
    const { todoListId, todoItemId } = event;
    const todoList = await this.todoListModel.findById(todoListId);

    if (!todoList) {
      throw new Error('Todo list not found');
    }

    await this.todoListModel.findByIdAndUpdate(
      todoListId,
      { $pull: { todoItems: todoItemId },
      })
  }
}