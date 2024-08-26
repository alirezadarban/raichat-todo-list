import { Types } from 'mongoose';

export interface CreateTodoListInput {
    title: string;
    userId: string;
}

export interface UpdateTodoListInput {
    id: string;
    userId: string;
    title: string;
}

export interface DeleteTodoListInput {
    id: string;
    userId: string;
}