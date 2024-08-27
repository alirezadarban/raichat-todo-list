import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from "mongoose";
import { TodoListDeletedEvent } from '../impl/todo-list-deleted.event';
import { TodoItem, TodoItemDocument } from "../../../todo-items/schemas/todo-item.schema";
import { User, UserDocument } from "../../../users/schemas/user.schema";

@EventsHandler(TodoListDeletedEvent)
export class TodoListDeletedHandler implements IEventHandler<TodoListDeletedEvent> {
  constructor(
    @InjectModel(TodoItem.name)
    private readonly todoItemModel: Model<TodoItemDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async handle(event: TodoListDeletedEvent) {
    const { todoListId, userId } = event;

    await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { todoLists: todoListId },
      });

    await this.todoItemModel.deleteMany({todoListId: new Types.ObjectId(todoListId)});

  }
}