import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../modelos/user-response.modelo';
import { User } from '../modelos/user.modelo';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private httpClient = inject(HttpClient); //permite que execute as requisições
  private urlBase = environment.api + '/users';

  /// Fazer um método para cada requisição 

  public obterTodos() {
   //return this.httpClient.get<UserResponse>(this.urlBase);
   return this.httpClient.get<User[]>(this.urlBase);
  }

  public remover(id: number){
    return this.httpClient.delete(this.urlBase +'/'+id);
    //return this.httpClient.delete(`${this.urlBase}/${id}`);
  }

}
