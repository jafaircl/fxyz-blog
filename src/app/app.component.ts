import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
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

  constructor(private activatedRoute: ActivatedRoute, private cms: CmsService, private router: Router) {
    this.watchPosts();
  }

  private get routeParams() {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
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
    ).subscribe(params => {
      this.cms.fetchPost(params.postId)
      console.log(params);
    });
  }
}
