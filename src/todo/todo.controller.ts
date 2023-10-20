import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { TodoService } from './todo.service';
import { GetUser } from '../auth/decorators'; //  Import the GetUser decorator for extracting user information.
import { CreateTodoDto, EditTodoDto } from './dto'; // Import Data Transfer Objects (DTOs) for creating and editing todos.


// Apply the JwtGuard to protect all routes in this controller.
@UseGuards(JwtGuard)
@Controller('todos') // // Base route is /todos/
export class TodoController {
    constructor(private todoService: TodoService){}
    
    // Route to get all todos for the authenticated user.
    @Get()
    getTodos(@GetUser('id') userId: number){
        return this.todoService.getTodos(userId);
    }

    // Route to get Todos by id
    @Get(':id')
    getTodoById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) todoId: number,
    ) {
        return this.todoService.getTodoById(userId, todoId);
    }

    // Route to get Todos by status
    @Get()
    getTodoByStatus(
        @GetUser('id') userId: number,
        @Query('status', ParseBoolPipe) status: boolean
    ) {
        return this.todoService.getTodoByStatus(userId, status);
    }


    // Create Todo with the Data transfer Object 
    @Post()
    createTodo(
        @GetUser('id') userId: number, 
        @Body() dto: CreateTodoDto
    ) {
        return this.todoService.createTodo(userId, dto);
    }

    // Route to Edit todo with the Edit Data transfer Object
    @Patch(':id')
    editTodoById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) todoId:number,
        @Body() dto: EditTodoDto
    ) {
        return this.todoService.editTodoById(userId, todoId,  dto);
    }

    // Route to Delete Todo by id
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteTodoById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) todoId: number,
    ) {
        return this.todoService.deleteTodoById(userId, todoId);
    }

    
}
