import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../api/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('Acessou a guarda');
  const loginService = inject(LoginService);
  const router = inject(Router);

  const usuarioLogado: any = loginService.getPayload();

  if (usuarioLogado?.nivel == 'Geral') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
