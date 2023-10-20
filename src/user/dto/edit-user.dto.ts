import { IsEmail, IsOptional, IsString } from "class-validator";

// Dto for editing User Details 
export class EditUserDto{

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;
}