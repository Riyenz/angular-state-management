import { Post } from './models/posts.model';
import { Observable } from 'rxjs';
import { PostsStore } from './stores/posts.store';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(
    private postsStore: PostsStore
  ) {
    this.postsStore.init();
  }

  ngOnInit() {
    this.posts$ = this.postsStore.getAll$();
  }

  createPost() {
    this.postsStore.create$({
      userId: 1,
      title: 'Codedam',
      body: 'Unlock Codes and It is Awsome'
    }).subscribe(post => {
      console.log(post);
    });
  }

  updatePost() {
    this.postsStore.update$( 1, {
      userId: 1,
      title: 'Codedam',
      body: 'Unlock Codes and It is Awsome'
    }).subscribe(post => {
      console.log(post);
    });
  }

  deletePost() {
    this.postsStore.delete$(1).subscribe(post => {
      console.log(post);
    });
  }
}
