import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TodoListsService } from '../services/todo-lists.service';
import { CreateTodoListDto } from '../dtos/create-todo-list.dto';
import { CreateTodoItemDto } from '../../todo-items/dtos/create-todo-item.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UpdateTodoListDto } from '../dtos/update-todo-list.dto';

@UseGuards(JwtAuthGuard)
@Controller('todolist')
export class TodoListsController {
  constructor(private readonly todoListService: TodoListsService) {}

  @Post()
  async create(@Request() req, @Body() createTodoListDto: CreateTodoListDto) {
    const { title } = createTodoListDto;
    const userId = req.user.sub; // Extract user ID from JWT
    await this.todoListService.create(title, userId);
    return { message: 'TodoList created successfully' };
  }

  @Get()
  async findAll(@Request() req) {
    return this.todoListService.findAllByUserId(req.user._id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todoListService.findById(id);
  }

  @Put(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateTodoListDto: UpdateTodoListDto) {
    const userId = req.user.sub;
    const { title } = updateTodoListDto;
    return this.todoListService.update({id, userId, title});
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.todoListService.remove(id);
  }
}
