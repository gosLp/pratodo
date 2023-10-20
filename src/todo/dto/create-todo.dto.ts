import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

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