import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  id: string;
  title: string;
  slug: string;
  coverImgUrl: string | null;
  readTime: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8080/api/search';

  constructor(private http: HttpClient) {}

  getSearchResults(query: string): Observable<Article[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Article[]>(this.apiUrl, { params });
  }
}
