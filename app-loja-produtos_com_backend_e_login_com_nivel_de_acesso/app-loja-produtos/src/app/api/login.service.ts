import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../modelo/login.modelo';
import { LoginResponse } from '../modelo/login-response.model';
import { jwtDecode } from 'jwt-decode';

@Service()
export class LoginService {
  private urlBase = environment.api + '/pessoa';
  private httpClient = inject(HttpClient);

  public login(login: Login) {
    return this.httpClient.post<LoginResponse>(this.urlBase + '/login', login);
  }

  public setToken(token: string) {
    localStorage.setItem('TOKEN', token);
  }

  public getToken() {
    return localStorage.getItem('TOKEN');
  }

  public removeToken() {
    localStorage.removeItem('TOKEN');
  }

  public getPayload(): { nivel: string } | null {
    try {
      return jwtDecode<{ nivel: string }>(this.getToken()!);
    } catch (error) {
      return null;
    }
  }

  public isGeral(): boolean {
    return this.getPayload()?.nivel === 'Geral';
  }
}
