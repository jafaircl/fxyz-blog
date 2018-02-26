import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { markedOptionsFactory } from './factories/marked-options.factory';

import { ExplodeAnimationDirective } from './directives/explode-animation.directive';
import { CmsService } from './services/cms/cms.service';
import { ColorService } from './services/color/color.service';
import { SeoService } from './services/seo/seo.service';
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
// import { TextBalancerService } from './services/text-balancer/text-balancer.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MarkdownModule.forRoot({
      provide: MarkedOptions,
      useFactory: markedOptionsFactory,
    }),
  ],
  exports: [
    MarkdownModule,
    ExplodeAnimationDirective,
    TimeAgoPipe
  ],
  declarations: [ExplodeAnimationDirective, TimeAgoPipe]
})
export class SharedModule {

  constructor (apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'https://api.graphcms.com/simple/v1/cj8iwc38x03o001623mme0k6u' }),
      cache: new InMemoryCache()
    });
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        CmsService,
        ColorService,
        SeoService
        // TextBalancerService
      ],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
