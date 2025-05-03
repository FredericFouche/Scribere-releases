import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../env/env';

/**
 * Represents an article with its essential properties.
 */
export interface Article {
  id: string;
  title: string;
  slug: string;
  coverImgUrl?: string;
  readTime?: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Represents a paginated response of items.
 * @template T - The type of the items in the page
 */
export interface Page<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
}

/**
 * Service that handles article CRUD operations.
 */
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) { }

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

    return this.http.get<Page<Article>>(this.apiUrl, { params });
  }

  /**
   * Retrieves an article by its slug.
   *
   * @param slug - The URL-friendly identifier of the article
   * @returns An Observable with the article or null if not found
   */
  getArticleBySlug(slug: string): Observable<Article | null> {
    return this.getArticles(0).pipe(
      map((page) => page.content.find((article) => article.slug === slug) || null)
    );
  }
}
