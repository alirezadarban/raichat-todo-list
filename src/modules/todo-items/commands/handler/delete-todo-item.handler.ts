import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoItemCommand } from '../impl/delete-todo-item.command';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TodoListsService } from '../../../todo-lists/services/todo-lists.service';
import { TodoItemDeletedEvent } from '../../events/impl/todo-item-deleted.event';
import { TodoItem } from '../../entities/todo-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler implements ICommandHandler<DeleteTodoItemCommand> {
  constructor(
    private readonly todoListService: TodoListsService,
    private readonly eventBus: EventBus,
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
  ) {}

  async execute(command: DeleteTodoItemCommand): Promise<TodoItem> {
    const { id, userId } = command;

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

    await this.todoItemRepository.delete(id);

    this.eventBus.publish(new TodoItemDeletedEvent(todoItem.id, todoItem.todoList.id));

    return todoItem;
  }
}
