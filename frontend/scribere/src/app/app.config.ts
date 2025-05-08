import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { ArticleService } from './services/article/article.service';
import { ArticleApiLocalService } from './services/article/api/article-api-local.service';
import { SearchService } from './services/search/search.service';
import { SearchApiLocalService } from './services/search/api/search-api-local.service';

export function ArticleApiLocalServiceFactory(): ArticleService {
  return new ArticleApiLocalService();
}

export function SearchApiLocalServiceFactory(): SearchApiLocalService {
  return new SearchApiLocalService();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: ArticleService,
      useFactory: ArticleApiLocalServiceFactory,
    },
    {
      provide: SearchService,
      useFactory: SearchApiLocalServiceFactory,
    },
  ],
};
