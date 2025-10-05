import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../../shared/shared service/shared.service';
import { AuthService } from '../../shared/Auth service/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const sharedService = inject(SharedService);
  const authService = inject(AuthService);
  const token = sharedService.getToken();

  if (!token) {
    authService.logoutUser();
    return router.parseUrl('/signin');
  }

  return authService.authenticateUser().pipe(
    map((res) => {
      if (res.status) {
        return true;
      }

      authService.logoutUser();
      return router.parseUrl('/signin');
    }),
    catchError(() => {

      authService.logoutUser();
      return of(router.parseUrl('/signin'));
    })
  )
};
