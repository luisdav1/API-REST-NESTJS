import { Module } from '@nestjs/common';
import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [PizzasController],
  providers: [PizzasService,PrismaService]
})
export class PizzasModule {}