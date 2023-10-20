import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';
import {  ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UserModule, TodoModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true,})],
})
export class AppModule {}
