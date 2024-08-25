import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TodoList, TodoListDocument } from '../schemas/todo-list.schema';
import { TodoItem, TodoItemDocument } from '../../todo-items/schemas/todo-item.schema';
import { CreateTodoListDto } from '../dtos/create-todo-list.dto';
import { CreateTodoItemDto } from '../../todo-items/dtos/create-todo-item.dto';

@Injectable()
export class TodoSagaRepository {
  constructor(
    @InjectModel(TodoList.name) private todoListModel: Model<TodoListDocument>,
    @InjectModel(TodoItem.name) private todoItemModel: Model<TodoItemDocument>
  ) {}

  async createTodoListWithItems(userId: Types.ObjectId, createTodoListDto: CreateTodoListDto, createTodoItemDtos: CreateTodoItemDto[]): Promise<TodoList> {
    const session = await this.todoListModel.db.startSession();
    session.startTransaction();
    try {
      const todoList = new this.todoListModel({ ...createTodoListDto, userId });
      await todoList.save({ session });

      const todoItems = createTodoItemDtos.map(dto => ({ ...dto, todoList: todoList._id }));
      await this.todoItemModel.insertMany(todoItems, { session });

      await session.commitTransaction();
      session.endSession();

      return todoList;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
