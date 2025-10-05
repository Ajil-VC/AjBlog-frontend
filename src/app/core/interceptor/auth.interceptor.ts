import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { SharedService } from '../../shared/shared service/shared.service';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/Auth service/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { ToastService } from '../data/toast/toast.service';
import { ERROR_CODE } from '../domain/errorcode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const shared = inject(SharedService);
  const token = shared.getToken();
  const toast = inject(ToastService);

  let cloneReq = req;
  if (token) {

    cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  return next(cloneReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 0) {

        toast.showError('Unable to connect to the server. Please check your internet connection.');

      } else if (error.status === 401 && !req.url.includes('/refresh-token')) {
        // Try refreshing the token
        return authService.refreshToken().pipe(
          switchMap(() => {
            // Retry original request with new access token
            const newReq = cloneReq.clone({
              setHeaders: {
                Authorization: `Bearer ${shared.getToken()}`
              }
            });
            return next(newReq);
          }),
          catchError(refreshError => {
            // Refresh token is also invalid => logout and clear everything
            authService.logoutUser();
            return throwError(() => new Error('Session expired. Please log in again.'));
          })
        );
      } else if (error.status === 404 || error.status === 400) {

        if (error.status === 400) {
          return throwError(() => new Error('Bad request.'));
        }

        toast.showError('Something went wrong. Please try again.');
      } else if (error.status === 409) {

        return throwError(() => error);
      } else if (error.status >= 500) {
        console.log(error.error.code)
        if (!(error.error['code'] && (error.error.code === ERROR_CODE.JWT_ERROR))) {

          toast.showError(error.error.message);
        }
      }

      return throwError(() => new Error('Something went wrong. Please try again.'));
    })
  );


};
