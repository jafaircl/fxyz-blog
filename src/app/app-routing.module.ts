import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/blog'
  }, {
    path: 'blog',
    pathMatch: 'full',
    loadChildren: 'app/post-list/post-list.module#PostListModule'
  }, {
    path: 'blog/:postId',
    loadChildren: 'app/post-detail/post-detail.module#PostDetailModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
