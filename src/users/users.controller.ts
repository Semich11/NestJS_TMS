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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from './enums/user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get('profile')
  // getProfile(@Req() req) {
  //   console.log('Incoming request method:', req.method);

  //     if (req.method === 'OPTIONS') {
  //   return; // ignore preflight
  // }
  //   const userObject = this.usersService.findOne(req.user.id);
  //   console.log(userObject)
  //   return userObject;
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    if (req.method === 'OPTIONS') return;

    console.log('Incoming request method:', req.method);
    console.log('req.user:', req.user);

    const userObject = this.usersService.findOne(req.user.id);
    console.log('Found user:', userObject);
    return userObject;
  }

  @Roles(UserRole.ADMIN)
  @Get()
  getAllUser() {
    return this.usersService.findAll();
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Deleted ID: ", id)
    return this.usersService.remove(+id);
  }
}
