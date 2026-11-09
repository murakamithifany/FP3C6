import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity()
export class Produto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({})
    nome: string;

    @Column()
    quantidade: number;

    @Column({ type: 'double' })
    preco: number;

    @Column({})
    fornecedor: string;

    @Column({ name: 'categoria_id', length: 36 })
    categoria_id: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos,
        { nullable: false, cascade: ["insert"] })
    @JoinColumn({ name: "categoria_id" })
    categoria: Categoria;
}
