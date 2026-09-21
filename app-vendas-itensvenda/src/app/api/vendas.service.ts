import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Venda } from '../modelo/venda-modelo';

@Injectable({
    providedIn: 'root',
})
export class VendasService {
    private httpClient =  inject(HttpClient);
    private urlBase = environment.api + '/vendas';

    public obterTodos(){
        return this.httpClient.get<Venda[]>(this.urlBase);
    }

    public obterPeloId(id: string){
        return this.httpClient.get<Venda>(this.urlBase + '/' + id);
    }

    public obterCliente(cliente: string){
        return this.httpClient.get<Venda[]>(`${this.urlBase}?cliente:contains=${cliente}`)
    }
}
