import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

// injecting TodoService
@Module({
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
