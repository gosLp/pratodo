import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; //'src/prisma/prisma.service';
import { GetUser } from '../auth/decorators';//'src/auth/decorators';
import { CreateTodoDto, EditTodoDto } from './dto';

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService){

    }
    getTodos(userId: number){
        return this.prisma.todo.findMany({
            where:{
                userId: userId,
            }
        })
    }


    async getTodoById(userId:number, todoId: number) {
        const todo = await this.prisma.todo.findFirst({
            where:{
                id: todoId,
                userId,
            }
        });
        return todo;
    }

    async getTodoByStatus(userId:number, status: boolean) {
        const todo = await this.prisma.todo.findMany({
            where:{
                status: status,
                userId,
            }
        });

        return todo;
    }

    async createTodo(userId: number, dto: CreateTodoDto) {
        const todo = await this.prisma.todo.create({
            data:{
                userId: userId,
                ...dto
            }
        });

        return todo;
    
    }

    async editTodoById(userId: number, todoId: number,  dto: EditTodoDto) {

        //get the todos by id,

        const todo = await this.prisma.todo.findUnique({
            where:{
                id:todoId,
            }
        });
        // check if user owns todo
        if(!todo || todo.userId !== userId){
            throw new ForbiddenException('Access to Resource denined')
        }

        return this.prisma.todo.update({
            where:{
                id: todoId
            },
            data:{
                ...dto,
            },
        });

    }

    

    async deleteTodoById(userId: number, todoId: number) {
         //get the todos by id,

         const todo = await this.prisma.todo.findUnique({
            where:{
                id:todoId,
            }
        });
        // check if user owns todo
        if(!todo || todo.userId !== userId){
            throw new ForbiddenException('Access to Resource denined')
        }

        await this.prisma.todo.delete({
            where:{
                id: todoId,
            }
        });

    }
}
