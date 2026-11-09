import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Categoria } from "../modelo/categoria-modelo";

@Injectable({
    providedIn: 'root',
})
export class CategoriaService {
    private httpClient = inject(HttpClient);
    private urlBase = environment.api + '/categoria';

    public obterTodos() {
        return this.httpClient.get<Categoria[]>(this.urlBase);
    }
}