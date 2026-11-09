import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelAcesso, Pessoa } from './entities/pessoa.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { CreatePessoaDto } from './dto/create-pessoa.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pessoa]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [PessoaController],
  providers: [PessoaService],
})
export class PessoaModule {

  constructor(private pessoaService: PessoaService) {
    this.inserirPessoas();
  }

  private inserirPessoas() {
    const usuarios: { nome: string; login: string; nivel: NivelAcesso }[] = [
      { nome: 'User', login: 'user', nivel: NivelAcesso.Geral },
      { nome: 'Financeiro', login: 'financeiro', nivel: NivelAcesso.Financeiro },
      { nome: 'Admin', login: 'admin', nivel: NivelAcesso.Administrador },
    ];

    for (const u of usuarios) {
      const pessoa = new CreatePessoaDto();
      pessoa.nome = u.nome;
      pessoa.email = `${u.login}@email.com`;
      pessoa.login = u.login;
      pessoa.senha = '123456';
      pessoa.idade = 30;
      // nivel não está no DTO (whitelist), por isso o cast
      this.pessoaService.inserir({ ...pessoa, nivel: u.nivel } as CreatePessoaDto);
    }
  }

}
