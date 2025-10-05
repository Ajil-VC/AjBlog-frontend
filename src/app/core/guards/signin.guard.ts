import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../../shared/shared service/shared.service';
import { AuthService } from '../../shared/Auth service/auth.service';
import { catchError, map, of } from 'rxjs';

export const signinGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const sharedService = inject(SharedService);
  const authService = inject(AuthService);
  const token = sharedService.getToken();

  if (!token) {

    return of(true);
  }

  return authService.authenticateUser().pipe(
    map((res) => {
      if (!res.status) {
        return true;
      }

      return router.parseUrl('');
    }),
    catchError(() => {
      return of(true);
    })
  )

};
