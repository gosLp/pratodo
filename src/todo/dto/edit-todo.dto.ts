import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

// DTO for editing todos 
export class EditTodoDto{

    @IsString()
    @IsOptional()
    title?: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsBoolean()
    @IsOptional()
    status?: boolean
}