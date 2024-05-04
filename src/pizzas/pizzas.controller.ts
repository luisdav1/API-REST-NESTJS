import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { CreateUpdatePizza } from './dto/create-update.dto';
import { ValidationPizzaPipe } from './pipe/validation-pizza/validation-pizza.pipe';


@Controller('/pizzas')
export class PizzasController {
    
    pizzasService: PizzasService; 
    
    constructor(pizzasService:PizzasService) {
        this.pizzasService = pizzasService
    }

    //Codigo status
    @Get('/notfound')
    @HttpCode(404) 
    notFound() {
        return '<h1>Error 404, Not Found</h1>'
    }

    @Get()
    getAllPizzas(@Query('limite',ValidationPizzaPipe) limite?:number) { 
        //El usuario puede acceder a /pizzas?limite=2 para solo mostrar 2 pizzas    
        return this.pizzasService.getPizzas(limite);
    }
    
    @Get('/:id')
    getPizza(@Param('id') id:string) {
        return this.pizzasService.getPizza(Number(id));
    }
    
    @Post()
    //@UsePipes(new ValidationPipe()) Puesto de manera global en main.ts
    createPizza(@Body() {nombre, descripcion, img, like} : CreateUpdatePizza) {
        return this.pizzasService.createPizza({nombre,descripcion,img,like})
    }
    
    @Put('/:id')
    //@UsePipes(new ValidationPipe())
    updatePizza(@Body() {nombre, descripcion, img, like} : CreateUpdatePizza, @Param('id') id:string ) {
        return this.pizzasService.updatePizza(Number(id),{nombre,descripcion,img,like})
    }
    
    @Delete('/:id')
    deletePizza(@Param('id') id:string) {
        return this.pizzasService.deletePizza(Number(id))
    }
    
    @Patch('/:id') 
    updatePizzaLike(@Param('id') id:string) {
        return this.pizzasService.updateLike(Number(id))
    }
}
