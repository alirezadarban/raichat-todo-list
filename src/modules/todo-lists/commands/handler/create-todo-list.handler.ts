import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../impl/create-todo-list.command';
import { TodoListCreatedEvent } from '../../events/impl/todo-list-created.event';
import { TodoList } from '../../entities/todo-list.entity';
import { User } from '../../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTodoListCommand): Promise<TodoList> {
    const { userId, title } = command;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newTodoList = this.todoListRepository.create({
      user: user,
      title: title,
    });

    const todoList = await this.todoListRepository.save(newTodoList);
    if (!todoList) {
      throw new InternalServerErrorException('Failed to save the todo list');
    }

    this.eventBus.publish(new TodoListCreatedEvent(todoList.id, userId));

    return todoList;
  }
}
