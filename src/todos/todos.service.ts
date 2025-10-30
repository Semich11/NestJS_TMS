import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, user) {
    const todo = this.todoRepository.create({ ...createTodoDto, user });
    return await this.todoRepository.save(todo);
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findAllByUser(userId: number) {
  return await this.todoRepository.find({
    where: { user: { id: userId } },
    loadRelationIds: true,
  });
}


//   async findAllByUser(userId: number) {
//   return await this.todoRepository.find({
//     where: { user: userId }, // ✅ simpler and faster
//     order: { created_at: 'DESC' },
//   });
// }


  async findOne(id: number) {
    return (await this.todoRepository, this.findOne(id));
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
