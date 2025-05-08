import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../model/article.model';
import { Page } from '../../model/page.model';

/**
 * Service that handles article CRUD operations.
 */
@Injectable({
  providedIn: 'root'
})
export abstract class ArticleService {
  abstract getArticles(page: number, size: number): Observable<Page<Article>>;
  abstract getArticleById(id: string): Observable<Article | null>;
}
  