import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
      ) {}
    
      public inserir(pessoa: Partial<Categoria>) {
        return this.categoriaRepository.save(pessoa);
      }
    
      public buscarTodas() {
        return this.categoriaRepository.find({
            select: {
                id: true,
                nome: true
            },
            order: {
                nome: "DESC"
            }
    
        });
      }
    
      public buscarPeloId(id: string) {
        // findBy, findOneBy -> não precisa where
        return this.categoriaRepository.find({ 
          select: {
            id: true,
            nome: true,
            produtos: {
              nome: true
            }
          },
          relations: {
            produtos: true
          },
          where: {
            id
          }
         });
      }
    
      public buscarPeloNome(nome: string) {
        return this.categoriaRepository.find({
          where: {
            nome: Like(`%${nome}%`),
          },
        });
      }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
