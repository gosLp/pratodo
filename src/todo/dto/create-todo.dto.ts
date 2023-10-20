import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

// Data transfer object for creating new todo
export class CreateTodoDto{

    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsBoolean()
    @IsNotEmpty()
    status: boolean
}