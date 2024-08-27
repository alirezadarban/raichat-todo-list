import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from "../../users/schemas/user.schema"
import { TodoItem } from '../../todo-items/schemas/todo-item.schema';

export type TodoListDocument = TodoList & Document;

@Schema()
export class TodoList {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ 
    type: Types.ObjectId, 
    ref: User.name, 
    required: true })
    userId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TodoItem' }] })
  todoItems: TodoItem[];
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
