import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}


    async updateHashedRefreshToken(userId: number, hashedRefreshToken: string | null) {
    return await this.usersRepository.update({ id: userId }, { hashedRefreshToken });
  }

  async create(createUserDto: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return await this.usersRepository.save(user);
  }



  async findByUsername(username: string) {
    console.log("Caller!!!")
    return await this.usersRepository.findOne({
      where: { username },
    });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    console.log("profile service ",id)
    return await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'role', 'hashedRefreshToken']
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    Object.assign(user, updateUserDto);

    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return await this.usersRepository.remove(user);
  }
}
