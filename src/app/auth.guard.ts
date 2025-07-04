import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn | CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  /*
  El método `parseUrl` devuelve un objeto `UrlTree`, que efectivamente cancela
la navegación anterior y redirige al usuario a la URL pasada en el
parámetro. Se aconseja usarlo sobre el método `navigate`, que puede
introducir un comportamiento inesperado y puede llevar a problemas de navegación complejos.
*/
  return router.parseUrl('/');
};
