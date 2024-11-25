import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from '../impl/update-todo-item.command';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItem } from '../../entities/todo-item.entity';
import { TodoListsService } from '../../../todo-lists/services/todo-lists.service';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler implements ICommandHandler<UpdateTodoItemCommand> {
  constructor(
    private readonly todoListService: TodoListsService,
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
  ) {}

  async execute(command: UpdateTodoItemCommand): Promise<TodoItem> {
    const { id, title, description, priority, userId } = command;

    const todoItem = await this.todoItemRepository.findOne({
      where: { id },
      relations: ['todoList'],
    });

    if (!todoItem) {
      throw new NotFoundException('Todo item not found');
    }

    const todoList = await this.todoListService.findById(todoItem.todoList.id);
    if (!todoList) {
      throw new NotFoundException('Todo list not found');
    }

    todoItem.title = title || todoItem.title;
    todoItem.description = description || todoItem.description;
    todoItem.priority = priority || todoItem.priority;

    return this.todoItemRepository.save(todoItem);
  }
}
