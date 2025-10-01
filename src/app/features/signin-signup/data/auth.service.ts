import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/domain/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  onSubmit(type: 'sign_in' | 'sign_up', email: string, password: string, userName: string): Observable<{ status: boolean, data: User, message: string }> {
    if (type === 'sign_up') {
      return this.http.post<{ status: boolean, data: User, message: string }>(`${environment.url}signup`, { email, password, userName });
    } else {
      return this.http.post<{ status: boolean, data: User, message: string }>(`${environment.url}signin`, { email, password });
    }
  }
}
