import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 50 })
  nome: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}
