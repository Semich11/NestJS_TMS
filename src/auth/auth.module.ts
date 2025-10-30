import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './strategies/local.stradegies';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import refreshJwtConfig from './config/refresh-jwt.config';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync(jwtConfig.asProvider()),
  ConfigModule.forFeature(jwtConfig),
  ConfigModule.forFeature(refreshJwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UsersService, 
    LocalStrategy, 
    JwtStrategy, 
    RefreshJwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AuthModule {}
