import { HttpClient } from '@angular/common/http';
import { inject, Injectable, } from '@angular/core';
import { environment } from '../../environments/environment';
import { Produto } from '../modelo/produto-modelo';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProdutosService {
    private httpClient = inject(HttpClient);
    private urlBase = environment.api + '/produtos';


    public obterTodos() {
        return this.httpClient.get<Produto[]>(this.urlBase);
    }

    public remover(id: string) {
        // return this.httpClient.delete(this.urlBase + '/' + id);
        return this.httpClient.delete<Produto>(`${this.urlBase}/${id}`);
    }

    public cadastrar(user: Produto) {
        return this.httpClient.post<Produto>(this.urlBase, user);
    }

    public obterPeloNome(nome: string) {
        return this.httpClient.get<Produto[]>(`${this.urlBase}?nome:contains=${nome}`);
    }

    public obterPeloId(id: string) {
        return this.httpClient.get<Produto>(this.urlBase + '/' + id);
    }

    public alterar(user: Produto) {
        return this.httpClient.put(this.urlBase + '/' + user.id, user);
    }

    public pesquisarNomeOuCategoria(descricao: string) {
        return this.httpClient.get<Produto[]>(`${this.urlBase}`).pipe(
            map(produtos => produtos.filter(produto =>
                produto.nome.toLowerCase().includes(descricao.toLowerCase()) ||
                produto.categoria.toLowerCase().includes(descricao.toLowerCase())
            )
            )
        );
    }
}

