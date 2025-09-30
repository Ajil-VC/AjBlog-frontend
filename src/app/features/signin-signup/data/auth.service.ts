import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  onSubmit(type: 'sign_in' | 'sign_up', email: string, password: string, userName: string): Observable<any> {
    if (type === 'sign_up') {
      return this.http.post(`${environment.url}signup`, { email, password, userName });
    } else {
      return this.http.post(`${environment.url}signin`, { email, password });
    }
  }
}
