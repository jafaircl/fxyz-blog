import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CmsService } from '../../shared/services/cms/cms.service';
import { ColorService } from '../../shared/services/color/color.service';

import { Post } from '../../shared/interfaces/post';
// import { TextBalancerService } from '../../shared/services/text-balancer/text-balancer.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  /*@HostListener('window:resize', ['$event'])
  onResize() {
    this.balanceText();
  }*/

  constructor(
    // private balancer: TextBalancerService,
    public cms: CmsService,
    private color: ColorService,
    // private element: ElementRef
  ) { }

  ngOnInit() {
    this.cms.fetchPostList();
    // this.cms.postList.subscribe(() => setTimeout(() => this.balanceText()));
  }

  public setPostColor(post: Post) {
    const bgAvg = this.color.avgColor(post.postColor1.substr(1), post.postColor2.substr(1));
    return this.color.yiq(bgAvg);
  }

  /*private balanceText(): void {
    this.element.nativeElement.querySelectorAll('.balance-text').forEach(element => {
      this.balancer.balanceText(element);
    });
  }*/

}
