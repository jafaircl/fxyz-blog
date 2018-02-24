import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { filter } from 'rxjs/operators/filter';

import { Apollo, QueryRef } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

import { QueryPostById, QueryAllPosts } from '../../graphql/post';
import { Post } from '../../interfaces/post';
import { PostQuery } from '../../interfaces/post-query';
import { PostListQuery } from '../../interfaces/post-list-query';
import { SeoService } from '../seo/seo.service';

@Injectable()
export class CmsService {

  protected static SInit = (() => {
    CmsService.prototype.post$ = new ReplaySubject<Post>();
    CmsService.prototype.postList$ = new ReplaySubject<Post[]>();
  })();

  public post$: ReplaySubject<Post>;
  public postList$: ReplaySubject<Post[]>;

  constructor(private apollo: Apollo) {
  }

  private fetch<T>(query: QueryRef<T>, variables = {}): Observable<ApolloQueryResult<T>> {
    return this.apollo.watchQuery<T>({ query, variables }).valueChanges;
  }

  public setPost(post: Post) {
    this.post$.next(post);
    this.fetchPost(post.postSlug);
  }

  public fetchPost(slug: string) {
    this.fetch<PostQuery>(QueryPostById, { slug })
      .pipe(
        filter(({ loading }) => !loading)
      ).subscribe(({ data }) => this.post$.next(data.BlogPost));
  }

  public fetchPostList() {
    this.fetch<PostListQuery>(QueryAllPosts)
      .pipe(
        filter(({ loading }) => !loading)
      ).subscribe(({ data }) => this.postList$.next(data.allBlogPosts));
  }

  public get post(): Observable<Post> {
    return this.post$.asObservable();
  }

  public get postList(): Observable<Post[]> {
    return this.postList$.asObservable();
  }

}
