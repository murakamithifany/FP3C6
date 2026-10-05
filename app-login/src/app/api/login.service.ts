import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../modelo/login.modelo';
import { LoginResponse } from '../modelo/login-response.modelo';

@Service()
export class LoginService {
    private urlBase = environment.api;
    private httpClient = inject(HttpClient);

    public login(login: Login){
        return this.httpClient.post<LoginResponse>(this.urlBase,login);
    }
}
