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

  public remover(id: string) {
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

  public obterPeloId(id:string){
////GET http://localhost:3000/users/id
return this.httpClient.get<User>(this.urlBase + '/' + id);
}

  public alterar(user: User) {
    ////PUT http://localhost:3000/users/:id,dados-do-usuario
    return this.httpClient.put(this.urlBase + '/' + user.id, user);
  }
}
