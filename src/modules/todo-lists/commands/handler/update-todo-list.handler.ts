import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from '../impl/update-todo-list.command';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoList } from '../../entities/todo-list.entity';
import { UsersService } from '../../../users/services/users.service';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler implements ICommandHandler<UpdateTodoListCommand> {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
  ) {}

  async execute(command: UpdateTodoListCommand): Promise<TodoList> {
    const { id, title, userId } = command;

    const todoList = await this.todoListRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!todoList) {
      throw new NotFoundException('Todo list not found');
    }

    const user = await this.userService.profile(todoList.user);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (todoList.user.id !== userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    todoList.title = title || todoList.title;

    return this.todoListRepository.save(todoList);
  }
}
