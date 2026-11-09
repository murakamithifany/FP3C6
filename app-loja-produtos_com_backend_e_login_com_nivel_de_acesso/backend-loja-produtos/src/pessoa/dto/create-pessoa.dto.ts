import { Expose } from "class-transformer";
import { IsNumber, IsString, MaxLength, Validate } from "class-validator";

export class CreatePessoaDto {
     @IsString()
    @MaxLength(10)
    @Expose({ name: 'nome_completo' })
    nome: string;

    @IsString()
    email: string;

    avatar: string;

    @IsNumber()
    //@Validate(IdadeValida)
    idade: number;

    @IsString()
    @MaxLength(20)
    login: string;

    @IsString()
    @MaxLength(10)
    senha: string;
}
