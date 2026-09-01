import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../modelo/user.modelo';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private urlBase = environment.api + '/users';

  public obterTodos() {
    return this.httpClient.get<User[]>(this.urlBase);
  }

  public remover(id: number) {
    // return this.httpClient.delete(this.urlBase + '/' + id);
    return this.httpClient.delete<User>(`${this.urlBase}/${id}`);
  }

  public cadastrar(user: User) {
    return this.httpClient.post<User>(this.urlBase, user);
  }

  public obterPeloNome(nome: string) {
    //GET http://localhost:3000/users?first_name:contains=xxxx
    return this.httpClient.get<User[]>(`${this.urlBase}?first_name:contains=${nome}`);
  }
}
