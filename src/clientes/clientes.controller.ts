import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClientDto } from './dto/create-clientes.dto';

@Controller('clientes')
export class ClientesController {

    constructor(private clienteService:ClientesService) {};

    @Get('')
    getClient() : object {
        return this.clienteService.getClientes();
    }

    @Post('')
    //@UsePipes(new ValidationPipe())
    createClient(@Body() nuevoCliente: CreateClientDto) {
        return this.clienteService.createCliente(nuevoCliente);
    }

    //Parsear variables con parsePipe
    @Get('/:num')
    makeOperation(@Param('num',ParseIntPipe) num:number) {
        return 10+num;
    }
}
