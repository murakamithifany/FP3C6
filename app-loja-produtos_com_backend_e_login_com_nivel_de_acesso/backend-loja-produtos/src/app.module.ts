import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { ProdutoModule } from './produto/produto.module';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    PessoaModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ifsp',
      database: 'db_loja_produtos',
      // entities: [Pessoa, Carro, Produto],
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true
    }),
    ProdutoModule,
    CategoriaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
