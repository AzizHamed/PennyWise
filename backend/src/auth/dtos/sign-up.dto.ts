import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class SignupDto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    budget: number;

    
}