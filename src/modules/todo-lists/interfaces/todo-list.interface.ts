import { Types } from 'mongoose';

export interface CreateTodoListInput {
    title: string;
    userId: Types.ObjectId;
}

export interface UpdateTodoListInput {
    id: Types.ObjectId;
    userId: Types.ObjectId;
    title: string;
}