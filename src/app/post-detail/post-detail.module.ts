import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostDetailRoutingModule } from './post-detail-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PostDetailRoutingModule,
    SharedModule.forChild()
  ],
  declarations: [PostDetailComponent]
})
export class PostDetailModule { }
