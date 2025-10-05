import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../../core/domain/post.interface';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  createStory(formData: FormData): Observable<{ status: boolean, message: string, data: Post }> {
    return this.http.post<{ status: boolean, message: string, data: Post }>(`${environment.url}posts`, formData);
  }

  getStories(query: string, page: number): Observable<{ status: boolean, message: string, data: Post[], totalPages: number }> {
    return this.http.get<{ status: boolean, message: string, data: Post[], totalPages: number }>(`${environment.url}all-posts?query=${query}&&page=${page}`);
  }

  getAuthorsStories(): Observable<{ status: boolean, message: string, data: Post[] }> {
    return this.http.get<{ status: boolean, message: string, data: Post[] }>(`${environment.url}posts`);
  }

  updateStory(formData: FormData): Observable<{ status: boolean, message: string, data: Post }> {
    return this.http.put<{ status: boolean, message: string, data: Post }>(`${environment.url}posts`, formData);
  }
}
