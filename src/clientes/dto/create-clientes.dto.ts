import { IsEmail, IsInt, IsNotEmpty, IsString, Max, MinLength } from "class-validator";

export class CreateClientDto {
    
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    name:string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password:string

    @IsInt()
    @Max(100)
    age:number
}