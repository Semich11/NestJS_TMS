// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { join } from 'path';
// import { UsersModule } from './users/users.module';
// import { TodosModule } from './todos/todos.module';
// import { AuthModule } from './auth/auth.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get('DB_HOST'),
//         port: +configService.get('DB_PORT'),
//         username: configService.get('DB_USERNAME'),
//         password: configService.get('DB_PASSWORD'),
//         database: configService.get('DB_NAME'),
//         entities: [join(process.cwd(), 'dist/**/*.entity.js')],
//         synchronize: true
//       })
//     }),
//     UsersModule,
//     TodosModule,
//     AuthModule
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}



import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConfig from './config/db.config';
import dbConfigProduction from './config/db.config.production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory:
        process.env.NODE_ENV === 'production' ? dbConfigProduction : dbConfig,
}),


    UsersModule,
    TodosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
