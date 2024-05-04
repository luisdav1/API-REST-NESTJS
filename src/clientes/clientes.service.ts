import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-clientes.dto';

@Injectable()
export class ClientesService {
    private clientes = [
        {id:1, name:'Luis', email:'luisda@gmail.com', password:'lnpsos', age:19},
    ]

    getClientes(): object {
        return this.clientes;
    }
    createCliente(data: CreateClientDto) {
        this.clientes.push({id:this.clientes.length+1, ...data})
        return this.clientes
    }
}
