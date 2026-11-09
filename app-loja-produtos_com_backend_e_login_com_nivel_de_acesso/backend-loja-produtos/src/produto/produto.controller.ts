import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Post()
  create(@Body() dto: CreateProdutoDto) {
    console.log(dto);
    return this.produtoService.create(dto);
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get('buscar')
  findByNameOrCategoria(@Query('busca') busca: string) {
    return this.produtoService.findByNameOrCategoria(busca);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(id);
  }

  /*@Put(':id') Atualização Completa
  update(@Param('id') id: string, @Body() dto: UpdateProdutoDto) {
    return this.produtoService.update(id, dto);
  }*/

  @Patch(':id') // Atualização Parcial
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(id);
  }
}
