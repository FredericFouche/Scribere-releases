import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../model/article.model';

/**
 * Service that handles article search functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8080/api/search';

  constructor(private http: HttpClient) {}

  /**
   * Searches for articles matching the provided query.
   *
   * @param query - The search term to look for in articles
   * @returns An Observable of Article array with search results
   */
  getSearchResults(query: string): Observable<Article[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Article[]>(this.apiUrl, { params });
  }
}
