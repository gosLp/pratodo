import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';
import {  ConfigModule } from '@nestjs/config';

@Module({
  
  imports: [
    AuthModule, // Auth Module
    UserModule, // User Module
    TodoModule, // Todo Module
    PrismaModule, // Prisma Module
    // Import the ConfigModule and configure it as a global module.
    ConfigModule.forRoot({ isGlobal: true,})], // // Make the ConfigModule available throughout the entire application.
})
export class AppModule {}
