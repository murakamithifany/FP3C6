import { Itens } from "./itens-venda-modelo";

export interface Venda{
    id: string,
    cliente: string,
    data: string,
    itens: Itens[]
}