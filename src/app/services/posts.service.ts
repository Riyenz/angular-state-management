import { Observable } from 'rxjs';
import { Post } from './../models/posts.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = 'https://jsonplaceholder.typicode.com/posts';
  }

  get$ = (): Observable<Post[]>  => this.http.get<Post[]>(this.url);

  post$ = (post: Post): Observable<Post> => this.http.post<Post>(this.url, { post });

  patch$ = (postId: number, post: Post): Observable<Post> => this.http.patch<Post>(`${this.url}/${postId}`, { post });

  delete$ = (postId: number): Observable<Post> => this.http.delete<Post>(`${this.url}/${postId}`);

}
