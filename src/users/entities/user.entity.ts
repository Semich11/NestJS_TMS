import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { Todo } from 'src/todos/entities/todo.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  hashedRefreshToken: string | null;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Todo, (todo) => todo.user)
  todo: Todo[];
}
