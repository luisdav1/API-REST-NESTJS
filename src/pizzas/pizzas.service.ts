import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdatePizza } from './dto/create-update.dto';
import { PrismaService } from './prisma.service';

export interface Pizza {
    id:number,
    nombre:string,
    descripcion:string,
    img: string,
    like:number
}

@Injectable()
export class PizzasService {
    
    constructor(private prisma : PrismaService) {}
    
    getPizzas(limite?:number) : Promise<Pizza[]> { 
        return  this.prisma.pizza.findMany({take:limite})
    }

    async getPizza(id:number) : Promise<Pizza | NotFoundException>  {
        const pizzaEncontrada = await this.prisma.pizza.findUnique({where: {id:id}})
        if (!pizzaEncontrada) {
            throw new NotFoundException(`No se encontro la pizza con el id ${id}`)
        }
        return pizzaEncontrada;
    } 

    async createPizza(nuevaPizza : CreateUpdatePizza) : Promise<Pizza[]> {
        await this.prisma.pizza.create({data:nuevaPizza})
        return this.prisma.pizza.findMany();
    }

    async updatePizza(id: number, actualizarPizza : CreateUpdatePizza) : Promise<Pizza[] | NotFoundException> {
        const result = await this.prisma.pizza.update({where:{id:id}, data:actualizarPizza})
        if (!result) {
            return new NotFoundException(`No se encontro la pizza con el id ${id}`)
        } else { 
           return this.prisma.pizza.findMany()
        }
    }

    async deletePizza(id:number) : Promise<Pizza[] | NotFoundException> {
        const result = await this.prisma.pizza.delete({where:{id:id}})
        if(!result) {
            return new NotFoundException(`No se encontro la pizza con el id ${id}`);
        } else {
            return this.prisma.pizza.findMany()
        }
    }

    async updateLike(id:number) :  Promise<Pizza[] | NotFoundException> {
        const pizza = await this.prisma.pizza.findUnique({where: {id:id}}) 
        if(!pizza) {
            return new NotFoundException(`No se encontro la pizza con el id ${id}`);
        } else {
            await this.prisma.pizza.update({where:{id:id},data:{like:pizza.like+1}})
            return this.prisma.pizza.findMany()
        }
    }
}
