import { Types } from 'mongoose';

export interface CreateTodoItemInput {
    title: string;
    description: string;
    priority: number;
    todoListId: string;
}

export interface UpdateTodoItemInput {
    id: string;
    title?: string;
    description?: string;
    priority?: number;
    todoListId?: string;
}

export interface DeleteTodoItemInput {
    id: string;
    userId: string;
}