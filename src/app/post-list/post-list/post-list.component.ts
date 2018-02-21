import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition, query, AnimationBuilder, AnimationPlayer } from '@angular/animations';

import { CmsService } from '../../shared/services/cms/cms.service';
import { ColorService } from '../../shared/services/color/color.service';

import { Post } from '../../shared/interfaces/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(public cms: CmsService, private color: ColorService) { }

  ngOnInit() {
    this.cms.fetchPostList();
  }

  public setPostColor(post) {
    const bgAvg = this.color.avgColor(post.postColor1.substr(1), post.postColor2.substr(1));
    return this.color.yiq(bgAvg);
  }

}
