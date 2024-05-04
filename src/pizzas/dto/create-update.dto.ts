import { IsInt, IsString, Min, MinLength } from "class-validator"

//Se crean las interfaces o clases que se recibiran del body de una peticion, parametros o querys
//dto(DataTransferObject)

//ISNumber y IsString nos permiten validar los atributos de una clase, estan definidos sin ejecutar
//Para ejecutar en el controller la validacion usamos el decorador usePipes(new ValidationPipes()) 

export class CreateUpdatePizza  {
    
    @IsString()
    @MinLength(4) //Minimo 4 caracteres
    nombre:string

    @IsString()
    @MinLength(4) //Minimo 4 caracteres
    descripcion:string

    @IsString()
    @MinLength(4) //Minimo 4 caracteres
    img:string

    @IsInt()
    @Min(0)
    like:number
}