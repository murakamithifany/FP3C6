import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Medico } from '../modelo/medico.modelo';

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  private httpClient = inject(HttpClient);
  private urlBase = environment.api + '/medicos';

  public obterMedicos() {
    return this.httpClient.get<Medico[]>(this.urlBase);
  }

  public obterPeloId(id: number) {
    return this.httpClient.get<Medico>(this.urlBase + '/' + id);
  }
}
