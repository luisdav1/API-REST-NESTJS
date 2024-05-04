import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdatePizza } from './dto/create-update.dto';
import { PrismaService } from './prisma.service';
import { TPizza } from './types/types';

@Injectable()
export class PizzasService {
    
    constructor(private prisma : PrismaService) {}
    
    async getPizzas(limite?:number) : Promise<TPizza[]> { 
        return  this.prisma.pizza.findMany({take:limite})
    }

    async getPizza(id:number) : Promise<TPizza>  {
        const pizzaEncontrada = await this.prisma.pizza.findUnique({where: {id:id}})
        if (!pizzaEncontrada) {
            throw new NotFoundException(`No se encontro la pizza con el id ${id}`)
        }
        return pizzaEncontrada;
    } 

    async createPizza(nuevaPizza : CreateUpdatePizza) : Promise<TPizza[]> {
        await this.prisma.pizza.create({data:nuevaPizza})
        return this.prisma.pizza.findMany();
    }

    async updatePizza(id: number, actualizarPizza : CreateUpdatePizza) : Promise<TPizza[]> {
        const pizzaEncontrada = await this.prisma.pizza.findUnique({where: {id:id}})
        if (!pizzaEncontrada) {
            throw new NotFoundException(`No se encontro la pizza con el id ${id}`)
        } else { 
            await this.prisma.pizza.update({where:{id:id}, data:actualizarPizza})
           return this.prisma.pizza.findMany()
        }
    }

    async deletePizza(id:number) : Promise<TPizza[]> {8
        const pizzaEncontrada = await this.prisma.pizza.findUnique({where: {id:id}})
        if (!pizzaEncontrada) {
            throw new NotFoundException(`No se encontro la pizza con el id ${id}`)
        } else {
            await this.prisma.pizza.delete({where:{id:id}})
            return this.prisma.pizza.findMany()
        }
    }

    async updateLike(id:number) :  Promise<TPizza[]> {
        const pizzaEncontrada = await this.prisma.pizza.findUnique({where: {id:id}}) 
        if(!pizzaEncontrada) {
            throw new NotFoundException(`No se encontro la pizza con el id ${id}`);
        } else {
            await this.prisma.pizza.update({where:{id:id},data:{like:pizzaEncontrada.like+1}})
            return this.prisma.pizza.findMany()
        }
    }
}
