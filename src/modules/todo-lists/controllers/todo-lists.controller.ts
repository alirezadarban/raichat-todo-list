import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { TodoListsService } from '../services/todo-lists.service';
import { CreateTodoListDto } from '../dtos/create-todo-list.dto';
import { UpdateTodoListDto } from '../dtos/update-todo-list.dto';

@UseGuards(JwtAuthGuard)
@Controller('todo-lists')
export class TodoListsController {
  constructor(private readonly todoListService: TodoListsService) {}

  @Post()
  async create(@Request() req,
               @Body() createTodoListDto: CreateTodoListDto) {
    const { title } = createTodoListDto;
    const userId = req.user.sub._id;
    await this.todoListService.create({ title, userId });
    return { message: 'TodoList created successfully' };
  }

  @Get()
  async findAll(@Request() req) {
    return this.todoListService.findAllByUserId(req.user.sub._id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todoListService.findById(id);
  }

  @Put(':id')
  async update(@Request() req,
               @Param('id') id: string,
               @Body() updateTodoListDto: UpdateTodoListDto) {
    const userId = req.user.sub._id;
    const { title } = updateTodoListDto;
    await this.todoListService.update({id, userId, title});
    return { message: 'TodoList updated successfully' };
  }

  @Delete(':id')
  async remove(@Request() req,
               @Param('id') id: string) {
    const userId = req.user.sub._id;
    await this.todoListService.remove({id, userId});
    return { message: 'Todo deleted successfully' };
  }
}
