import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';

@Controller('todo')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    const user = req.user;
    return this.todosService.create(createTodoDto, user);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  findAll(@Req() req) {
    return this.todosService.findAll();
  }

  @Get('getUSerTodos')
  getMyName(@Req() req) {
    const userId = req.user.id;
    return this.todosService.findAllByUser(userId);
  }





  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
