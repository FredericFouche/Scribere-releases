import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../model/article.model';
import { SearchService } from './search.service';

/**
 * Service that handles article search functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchApiLocalService implements SearchService {
  readonly #apiUrl = 'http://localhost:8080/api/search';
  private readonly http = inject(HttpClient);

  /**
   * Searches for articles matching the provided query.
   *
   * @param query - The search term to look for in articles
   * @returns An Observable of Article array with search results
   */
  getSearchResults(query: string): Observable<Article[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Article[]>(this.#apiUrl, { params });
  }
}
