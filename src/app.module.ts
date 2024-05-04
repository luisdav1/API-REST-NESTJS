import { Module } from '@nestjs/common';
import { PizzasModule } from './pizzas/pizzas.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [PizzasModule, PedidosModule, ClientesModule],
})
export class AppModule {}
