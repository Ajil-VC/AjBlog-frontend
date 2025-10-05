import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../core/domain/user.interface';
import { SharedService } from '../shared service/shared.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private shared: SharedService, private router: Router) { }

  private user = new BehaviorSubject<User | null>(null);
  $user = this.user.asObservable();

  authenticateUser(): Observable<{ status: boolean, data: User }> {

    return this.http.get<{ status: boolean, data: User }>(`${environment.url}authenticate-user`)
      .pipe(
        tap((res) => {
          if (res.status) {
            this.user.next(res.data);
          }
        })
      )
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${environment.url}refresh-token`, null, {
      withCredentials: true
    }).pipe(
      tap((res: any) => {
        this.shared.setToken(res.token);
      })
    )
  }

  onSubmit(type: 'sign_in' | 'sign_up', email: string, password: string, userName: string): Observable<{ status: boolean, data: User, message: string, accesstoken: string }> {
    if (type === 'sign_up') {
      return this.http.post<{ status: boolean, data: User, message: string, accesstoken: string }>(`${environment.url}signup`, { email, password, userName })
        .pipe(
          tap(response => {
            if (!response.accesstoken) throw new Error('Token Missing.');
            this.shared.setToken(response.accesstoken);
          })
        )
    } else {
      return this.http.post<{ status: boolean, data: User, message: string, accesstoken: string }>(`${environment.url}signin`, { email, password })
        .pipe(
          tap(response => {
            if (!response.accesstoken) throw new Error('Token Missing.');
            this.user.next(response.data);
            this.shared.setToken(response.accesstoken);
          })
        )
    }
  }

  logoutUser() {
    this.shared.removeToken();
    this.user.next(null);

    if (this.router.url === '/me') {
      this.router.navigate(['']);
    }
  }
}