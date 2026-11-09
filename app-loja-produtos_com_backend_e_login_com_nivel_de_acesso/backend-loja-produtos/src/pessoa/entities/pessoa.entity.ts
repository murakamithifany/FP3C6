import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum NivelAcesso {
  Administrador = "Administrador",
  Financeiro = "Financeiro",
  Geral = "Geral"
}

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 50 })
  @Expose({ name: "nome_completo"})
  nome: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100, nullable: true })
  @Exclude()
  avatar: string;

  @Column({ name: 'idade' })
  idade: number;

  @Column({
        type: "enum",
        enum: NivelAcesso,
        default: NivelAcesso.Geral,
    })
  nivel: NivelAcesso;

  @Column({ name: 'login', unique: true, length: 20 })
  login: string;

  @Column({ name: 'senha', length: 10 })
  @Exclude()
  senha: string;
}