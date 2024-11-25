import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { TodoItemsService } from '../services/todo-items.service';
import { CreateTodoItemDto } from '../dtos/create-todo-item.dto';
import { UpdateTodoItemDto } from '../dtos/update-todo-item.dto';

@UseGuards(JwtAuthGuard)
@Controller('todo-items')
export class TodoItemsController {
  constructor(private readonly todoItemService: TodoItemsService) {}

  @Post()
  async create(@Request() req,
               @Body() createTodoItemDto: CreateTodoItemDto) {
    const userId = req.user.id;
    return await this.todoItemService.create(createTodoItemDto, userId.toString());
    // return { message: 'TodoItem created successfully' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todoItemService.findById({ id });
  }

  @Get()
  async findAll(@Request() req) {
    return this.todoItemService.findAllByUserId(req.user.id);
  }

  @Put(':id')
  async update(@Request() req,
               @Param('id') id: string,
               @Body() updateTodoItemDto: UpdateTodoItemDto) {
    const userId = req.user.id;
    await this.todoItemService.update({id, ...updateTodoItemDto}, userId.toString());
    return { message: 'TodoItem updated successfully' };
  }

  @Delete(':id')
  async remove(@Request() req,
               @Param('id') id: string) {
    const userId = req.user.id;
    await this.todoItemService.remove({ id }, userId.toString());
    return { message: 'Todo deleted successfully' };
  }
}
