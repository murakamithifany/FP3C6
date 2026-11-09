import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Like, Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>) { }

  create(dto: CreateProdutoDto) {
    return this.produtoRepository.save(dto);
  }

  async update(id: string, dto: UpdateProdutoDto) {
    const resultado = await this.produtoRepository.update(id, dto);
    if (!resultado.affected)
      throw new NotFoundException();
    return this.findOne(id);
  }

  remove(id: string) {
    return this.produtoRepository.delete(id);
  }

  findAll() {
    return this.produtoRepository.find({
      relations: { categoria: true },
    });
  }

  findOne(id: string) {
    return this.produtoRepository.findOne({
      relations: {
        categoria: true
      },
      where: { id }
    });
    // return this.produtoRepository.findOneBy({id});
  }

  findByNameOrCategoria(busca: string) {
    return this.produtoRepository.find({
      relations: {
        categoria: true
      },
      where: [
        {
          nome: Like(`%${busca}%`)
        },
        {
          categoria: {
            nome: Like(`%${busca}%`)
          }
        }
      ]
    });
  }

  findByName(nome: string) {
    return this.produtoRepository.findBy({ nome: Like(`%${nome}%`) });
  }

  findByCategoria(categoriaId: string) {
    return this.produtoRepository.find({
      select: {
        nome: true,
        categoria: {
          nome: true
        }
      },
      relations: {
        categoria: true
      },
      where: {
        categoria: {
          id: categoriaId
        }
      }
    })
  };
}
