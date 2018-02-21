import { Component, OnInit } from '@angular/core';

import { CmsService } from '../../shared/services/cms/cms.service';
import { ColorService } from '../../shared/services/color/color.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  constructor(public cms: CmsService, public color: ColorService) { }

  ngOnInit() {
  }

  public setPostColor(post) {
    const bgAvg = this.color.avgColor(post.postColor1.substr(1), post.postColor2.substr(1));
    return this.color.yiq(bgAvg);
  }

}
