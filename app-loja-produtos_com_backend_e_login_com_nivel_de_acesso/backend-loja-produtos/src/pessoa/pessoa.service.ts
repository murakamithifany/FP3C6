import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { NivelAcesso, Pessoa } from './entities/pessoa.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PessoaService {
constructor(
    @InjectRepository(Pessoa)
    private pessoaRepository: Repository<Pessoa>,
    private jwtService: JwtService,
  ) {}

  public inserir(pessoa: CreatePessoaDto) {
    return this.pessoaRepository.save(pessoa);
  }

  public buscarPorNivel(nivel: NivelAcesso) {
    return this.pessoaRepository.find({
      select: {
        nome: true,
        nivel: true,
      },
      where: {
        nivel,
      },
      order: {
        nome: 'DESC',
      },
    });
  }

  public buscarTodas() {
    return this.pessoaRepository.find({
      // select: {
      //     id: true,
      //     nome: true
      // },
      order: {
        nome: 'DESC',
      },
    });
  }

  public buscarPeloId(id: string) {
    // findBy, findOneBy -> não precisa where
    return this.pessoaRepository.findOneBy({ id });
  }

  public async buscarPeloLoginESenha(login: string, senha: string) {
    const pessoa = await this.pessoaRepository.findOneBy({ login, senha });
    // if (!pessoa) return new UnauthorizedException();
    if (!pessoa) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    //Gerar JWT
    const payload = { sub: pessoa.id, nome: pessoa.nome, nivel: pessoa.nivel };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  // public buscarPeloLoginESenha(loginDto: LoginDto) {
  //   return this.pessoaRepository.findOneBy({
  //     login: loginDto.login,
  //     senha: loginDto.senha,
  //   });
  // }

  public buscarPeloNome(nome: string) {
    return this.pessoaRepository.find({
      where: {
        nome: Like(`%${nome}%`),
      },
    });
  }
}
