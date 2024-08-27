import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoListCreatedEvent } from '../impl/todo-list-created.event';
import { TodoList, TodoListDocument } from "../../schemas/todo-list.schema";
import { User, UserDocument } from "../../../users/schemas/user.schema";

@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedHandler implements IEventHandler<TodoListCreatedEvent> {
  constructor(
    // @InjectModel(TodoList.name)
    // private readonly todoListModel: Model<TodoListDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async handle(event: TodoListCreatedEvent) {
    const { todoListId , userId} = event;
    // const todoList = await this.todoListModel.findById(todoListId);
    //
    // if (!todoList) {
    //   throw new Error('Todo list not found');
    // }

    console.log(">>>>>>> event", event)

    await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { todoLists: todoListId },
    });
  }
}