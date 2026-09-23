import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Venda } from '../modelo/venda-modelo';
import { Itens } from '../modelo/itens-venda-modelo';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VendasService {
    private httpClient = inject(HttpClient);
    private urlBase = environment.api + '/vendas';

    public obterTodos() {
        return this.httpClient.get<Venda[]>(this.urlBase);
    }

    public obterPeloId(id: number) {
        return this.httpClient.get<Venda>(this.urlBase + '/' + id);
    }
    public remover(id: number) {
        return this.httpClient.delete<Venda>(`${this.urlBase}/${id}`);
    }

    public obterItem(idVenda: number, idItem: number) {
        return this.obterPeloId(idVenda).pipe(
            map((venda: Venda) => venda.itens.find(
                (item: Itens) => item.id === idItem
            ))
        );
    }

    public alterar(venda: Venda){
        return this.httpClient.put<Venda>(`${this.urlBase}/${venda.id}`,venda);
    }

}
