import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../api/login.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(LoginService).getToken();

  const newReq = req.clone({
    headers: req.headers.append(
      'Authorization', 'Bearer ' + authToken),
  });

  return next(newReq);
};
