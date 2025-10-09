
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../../core/domain/post.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private router: Router) { }

  private story = new BehaviorSubject<Post | null>(null);
  story$ = this.story.asObservable();
  openStory(story: Post, drafts: boolean = false) {
    if (drafts) {
      this.router.navigate(['publish-story']);
      this.story.next(story);
      return;
    }
    this.router.navigate(['story']);
    this.story.next(story);
  }

  private searchQuery = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuery.asObservable();
  searchStory(query: string) {
    this.searchQuery.next(query);
  }

  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }
  removeToken() {
    localStorage.removeItem('accessToken');
  }
  getToken() {
    const token = localStorage.getItem('accessToken');
    return token;
  }
}
