import { Controller, Request,Get, Post, Body, Patch, Param, Delete, Query, UseFilters, Req } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { NivelAcesso, Pessoa } from './entities/pessoa.entity';
import { Public } from '../decorators/public.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('pessoa')
export class PessoaController {
 private pessoas: any = []; //id, nome

  constructor(
    private pessoaService: PessoaService
  ) {}

  //Rota é formada:
  //endereço do servidor + controle + verbo (recurso)
  //http://10.117.77.121:3000/pessoa

  // http://localhost:3000/pessoa

  // http://localhost:3000/teste

  // http://localhost:3000/pessoa/teste

  // @UseGuards(AuthGuard)
  @Get()
  @UseFilters(HttpExceptionFilter)
  obterTodas(@Req() request) {
    console.log(request.payload);

    const nivel: NivelAcesso = request['payload'].nivel;


    return this.pessoaService.buscarPorNivel(nivel);
  }

  @Get('/descendente')
  obterTodasOrdenadasDescendente() {
    console.log('obterTodasOrdenadasDescendente');
    return {
      message: `Pessoas ordenadas descendente.`,
    };
  }

  //   @Get('/buscar-order')
  //   obterPeloNomeOrdenado(
  //     @Query('nome') nome: string,
  //     @Query('order') order: string,
  //   ) {
  //     return {
  //       message: `Obter pelo nome ${nome} e order ${order}`,
  //     };
  //   }

  @Get('/buscar')
  obterPeloNomeEOrder(
    @Query('nome') nome: string,
    @Query('order') order: string,
  ) {
    if (order && nome) {
      return {
        message: `Obter pelo nome ${nome} e order ${order}`,
      };
    } else if (nome) {
      return {
        message: `Obter pelo nome ${nome}`,
      };
    } else if (order) {
      return {
        message: `Obter pelo order ${order}`,
      };
    } else {
      return {
        message: `Sem parâmetros`,
      };
    }
  }

  @Get(':id')
  obterPeloId(@Param('id') id: string) {
    if (id) {
      return this.pessoaService.buscarPeloId(id);
    }
  }

  @Get('/nome/:nome')
  obterPeloNome(@Param('nome') nome: string) {
    console.log('obter pelo nome....' + nome);

    if (nome) {
      return this.pessoaService.buscarPeloNome(nome);
    }
  }

  @Post()
  inserir(@Body() corpo: CreatePessoaDto) {
    console.log(corpo);

    const p: Pessoa = this.pessoaService.inserir(corpo) as unknown as Pessoa;
    return p;
  }

  @Public()
  @Post('login')
  @UseFilters(HttpExceptionFilter)
  login(@Body() corpo: LoginDto) {
    console.log(corpo);

    return this.pessoaService.buscarPeloLoginESenha(
      corpo.login,
      corpo.senha,
    );
  }

  //verbo + ip/maquina + recurso
  //  POST http://localhost:3000 /pessoa -> Criar uma pessoa
  //  POST http://localhost:3000 /pessoa/login -> Login
}