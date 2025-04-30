import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../env/env';

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

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) { }

  getArticles(page: number, size: number = 10): Observable<Page<Article>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'createdAt,desc');

    return this.http.get<Page<Article>>(this.apiUrl, { params });
  }

  getArticleBySlug(slug: string): Observable<Article | null> {
    return this.getArticles(0).pipe(
      map((page) => page.content.find((article) => article.slug === slug) || null)
    );
  }
}
