import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import { TodoList } from '../../todo-lists/schemas/todo-list.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TodoList' }] })
  todoLists: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
