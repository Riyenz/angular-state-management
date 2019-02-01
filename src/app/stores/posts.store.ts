import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import { Store } from './store';
import { Post } from '../models/posts.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsStore extends Store<Post[]> {

  constructor(private postsService: PostsService) {
    super();
  }

  init = (): void => {
    if (this.getAll()) { return; }

    this.postsService.get$().pipe(
      tap(this.store)
    ).subscribe();
  }

  create$ = (post: Post): Observable<Post> => this.postsService
    .post$(post)
    .pipe(
      tap(resPost => {
        this.store([
          ...this.getAll(),
          {
            id: resPost.id,
            ...post
          }
        ]);
      })
    )

  update$ = (postId: number, post: Post) => this.postsService
    .patch$(postId, post)
    .pipe(
      tap(resPost => {
        const posts = this.getAll();
        const postIndex = this.getAll().findIndex(item => item.id === postId);
        posts[postIndex] = {
          id: resPost.id,
          ...post
        };

        this.store(posts);
      })
    )

  delete$ = (postId: number) => this.postsService
    .delete$(postId)
    .pipe(
      tap(() => {
        const posts = this.getAll();
        const postIndex = this.getAll().findIndex(item => item.id === postId);
        posts.splice(postIndex, 1);

        this.store(posts);
      })
    )
}
