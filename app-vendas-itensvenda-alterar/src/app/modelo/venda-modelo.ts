import { Itens } from "./itens-venda-modelo";

export interface Venda{
    id: number,
    cliente: string,
    data: string,
    itens: Itens[]
}