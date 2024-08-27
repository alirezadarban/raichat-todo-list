import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { TodoList, TodoListDocument } from "../../schemas/todo-list.schema";
import { GetTodoListQuery } from "../impl/get-todo-list.query";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetTodoListQuery)
export class GetTodoListHandler implements IQueryHandler<GetTodoListQuery> {
  constructor(
    @InjectModel(TodoList.name) private readonly todoListModel: Model<TodoListDocument>
  ) {
  }

  async execute(query: GetTodoListQuery): Promise<TodoList> {
    const { id } = query;

    const todoListWithItems = await this.todoListModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) }
      },
      {
        $lookup: {
          from: "todoitems",
          localField: "_id",
          foreignField: "todoListId",
          as: "todoItems",
          pipeline: [
            {
              $sort: { priority: -1 }
            }
          ]
        }
      }
    ]).exec();

    if (!todoListWithItems.length) {
      throw new NotFoundException("TodoList not found");
    }

    return todoListWithItems[0];
  }
}
