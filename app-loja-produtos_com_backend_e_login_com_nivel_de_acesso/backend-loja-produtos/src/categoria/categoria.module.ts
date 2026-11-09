import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriaModule {
  constructor(private categoriaService: CategoriaService) {
    this.inserirCategorias();
  }

  private inserirCategorias() {
    const categorias = [
      'Informática',
      'Periféricos',
      'Celulares',
      'Eletrônicos',
      'Áudio e Vídeo',
      'Acessórios'
    ];

    categorias.forEach(nome => {
      const categoria = new Categoria();
      categoria.nome = nome;
      this.categoriaService.inserir(categoria);
    });
  }
}
