import { Component, Inject, PLATFORM_ID, HostListener, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';

import { CmsService } from './shared/services/cms/cms.service';
import { SeoService } from './shared/services/seo/seo.service';
// import { TextBalancerService } from './shared/services/text-balancer/text-balancer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /*@HostListener('window:resize', ['$event'])
  onResize() {
    this.balanceText();
  }*/

  constructor(
    private activatedRoute: ActivatedRoute,
    // private balancer: TextBalancerService,
    private cms: CmsService,
    // private element: ElementRef,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private seo: SeoService
  ) {
    this.watchPosts();
    this.scrollTopOnRouteChange();
    this.setMeta();
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

  private setMeta() {
    this.cms.post.subscribe(post => {
      this.seo.setTags({
        title: `${post.postTitle} | Faircloth.xyz`,
        description: post.postDescription,
        image: post.openGraphImage.url
      });
    });
    this.cms.postList.subscribe(() => {
      this.seo.setTags({
        title: 'Blog | Faircloth.xyz',
        description: 'PPC, Web Development and Angular Posts'
      });
    });
  }

  /*private balanceText(): void {
    this.routeChangeEvent.subscribe(() => {
      this.element.nativeElement.querySelectorAll('.balance-text').forEach(element => {
        setTimeout(() => this.balancer.balanceText(element));
      });
    });
  }*/
}
