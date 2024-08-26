import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TodoList } from "../../todo-lists/schemas/todo-list.schema"

export type TodoItemDocument = TodoItem & Document;

@Schema()
export class TodoItem {
  @Prop({ 
    type: Types.ObjectId, 
    ref: TodoList.name,
    required: true })
    todoListId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({default: 0, max: 5, min: 0})
  priority: number;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
