import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';

import { CmsService } from './shared/services/cms/cms.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    private activatedRoute: ActivatedRoute,
    private cms: CmsService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {
    this.watchPosts();
    this.scrollTopOnRouteChange();
  }

  private get routeChangeEvent() {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );
  }

  private get routeParams() {
    return this.routeChangeEvent.pipe(
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.params)
    )
  }

  private watchPosts() {
    this.routeParams.pipe(
      filter(params => params.hasOwnProperty('postId'))
    ).subscribe(params => this.cms.fetchPost(params.postId));
  }

  private scrollTopOnRouteChange() {
    if (isPlatformBrowser(this.platformId)) {
      this.routeChangeEvent.subscribe(() => window.scrollTo(0, 0));
    }
  }
}
