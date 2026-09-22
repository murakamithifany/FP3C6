import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Produto } from '../modelo/produtos-modelo';

@Injectable({
    providedIn: 'root',
})
export class ProdutosService {
    private httpClient = inject(HttpClient);
    private urlBase = environment.api + '/api/v1/products.json';

    public pesquisar(marca: string) {
        return this.httpClient.get<Produto[]>(`${this.urlBase}?brand=${marca}`);
    }

    // public remover(marca: string){
    //     return this.httpClient.delete<Produto>(`${this.urlBase}/${marca}`);
    // }
}
