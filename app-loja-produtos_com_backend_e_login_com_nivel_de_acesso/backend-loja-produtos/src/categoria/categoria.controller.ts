import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  //Rota para criar uma categoria
  @Post()
  create(@Body() categoria: CreateCategoriaDto) {
    console.log(categoria);

    return {
      categoria
    }
    // return this.categoriaService.inserir(categoria);
  }

  //Rota para buscar todas
  @Get()
  findAll() {
    return this.categoriaService.buscarTodas();
  }

  //Rota para buscar pelo id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaService.buscarPeloId(id);
  }

  //Rota para buscar pelo nome
  @Get('/nome/:nome')
  buscarPeloNome(@Param('nome') nome: string) {
    return this.categoriaService.buscarPeloNome(nome);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}
