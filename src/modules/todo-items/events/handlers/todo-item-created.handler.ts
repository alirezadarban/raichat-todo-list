import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItemCreatedEvent } from '../impl/todo-item-created.event';
import { TodoList, TodoListDocument } from '../../../todo-lists/schemas/todo-list.schema';

@EventsHandler(TodoItemCreatedEvent)
export class TodoItemCreatedHandler implements IEventHandler<TodoItemCreatedEvent> {
  constructor(
    @InjectModel(TodoList.name) private readonly todoListModel: Model<TodoListDocument>,
  ) {}

  async handle(event: TodoItemCreatedEvent) {
    const { todoListId , todoItemId} = event;
    const todoList = await this.todoListModel.findById(todoListId);

    if (!todoList) {
      throw new Error('Todo list not found');
    }

    await this.todoListModel.findByIdAndUpdate(
      todoListId,
      { $addToSet: { todoItems: todoItemId },
    })
  }
}