import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProdutoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    categoria_id: string;

    @IsNumber()
    @IsPositive()
    preco: number;

    @IsInt()
    @Min(0)
    quantidade: number;

    @IsString()
    @IsNotEmpty()
    fornecedor: string;
}
