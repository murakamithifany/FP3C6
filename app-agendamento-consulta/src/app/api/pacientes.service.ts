import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Paciente } from '../modelo/paciente.modelo';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  private httpClient = inject(HttpClient);
  private urlBase = environment.api + '/pacientes';

  public obterPacientes() {
    return this.httpClient.get<Paciente[]>(this.urlBase);
  }

  public obterPeloId(id: number) {
    return this.httpClient.get<Paciente>(this.urlBase + '/' + id);
  }
}
