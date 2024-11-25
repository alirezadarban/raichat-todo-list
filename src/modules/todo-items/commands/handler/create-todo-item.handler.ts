import { CommandHandler, ICommandHandler, EventBus} from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoItemCommand } from '../impl/create-todo-item.command';
import { TodoItem } from '../../entities/todo-item.entity';
import { TodoList } from '../../../todo-lists/entities/todo-list.entity';
import { TodoItemCreatedEvent } from '../../events/impl/todo-item-created.event';

@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler implements ICommandHandler<CreateTodoItemCommand> {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTodoItemCommand): Promise<TodoItem> {
    const { todoListId, title, description, priority } = command;

    const todoList = await this.todoListRepository.findOneOrFail({
      where: { id: todoListId },
    });

    const todoItem = this.todoItemRepository.create({
      todoList,
      title,
      description,
      priority,
    });

    this.eventBus.publish(new TodoItemCreatedEvent(todoItem.id, todoListId));

    return this.todoItemRepository.save(todoItem);
  }
}
