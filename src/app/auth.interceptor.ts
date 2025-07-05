import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, EMPTY, throwError } from 'rxjs';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authReq = req.clone({
    setHeaders: { Authorization: 'myToken' },
  });
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        authService.logout();
        /*
        El interceptor llamará al método `logout` de la clase `AuthService`
        cuando ocurra un error 401 No autorizado y devolverá un observable
        `EMPTY` para dejar de emitir datos. Utilizará el operador `throwError`
        para propagar el error al manejador de errores global en todos los
        demás errores. Como ya hemos visto, el manejador de errores global
        examinará el error devuelto y actuará según el código de estado.
        */
        return EMPTY;
      } else {
        return throwError(() => error);
      }
    }),
  );
};
