import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/env';
import { Article } from '../model/article.model';
import { Page } from '../model/page.model';
import { ArticleService } from './article.service';

/**
 * Service that handles article CRUD operations.
 */
@Injectable({
  providedIn: 'root'
})
export class ArticleApiLocalService implements ArticleService {
  readonly #apiUrl = `${environment.apiUrl}/articles`;
  private readonly http = inject(HttpClient);

  /**
   * Retrieves a paginated list of articles.
   *
   * @param page - The zero-based page index to retrieve
   * @param size - The number of articles per page (default: 10)
   * @returns An Observable with a paginated list of articles
   */
  getArticles(page: number, size: number = 10): Observable<Page<Article>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'createdAt,desc');

    return this.http.get<Page<Article>>(this.#apiUrl, { params });
  }

  /**
   * Retrieves an article by its slug.
   *
   * @param slug - The URL-friendly identifier of the article
   * @returns An Observable with the article or null if not found
   */
  getArticleBySlug(slug: string): Observable<Article | null> {
    return this.http.get<Article>(`${this.#apiUrl}/by-slug/${slug}`);
  }
}
