import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Agendamento } from '../modelo/agendamento.modelo';

@Injectable({
  providedIn: 'root',
})
export class AgendamentosService {
  private httpClient = inject(HttpClient);
  private urlBase = environment.api + '/agendamentos';

  public obterTodos() {
    return this.httpClient.get<Agendamento[]>(this.urlBase);
  }

  public obterPeloId(id: number) {
    return this.httpClient.get<Agendamento>(this.urlBase + '/' + id);
  }

  public cadastrar(agendamento: Agendamento) {
    return this.httpClient.post<Agendamento>(this.urlBase, agendamento);
  }

}
