import { Categoria } from "./categoria-modelo";

export interface Produto {
    id: string,
    nome: string,
    categoria_id: string,
    preco: number,
    quantidade: number,
    fornecedor: string
    categoria?: Categoria,
}
