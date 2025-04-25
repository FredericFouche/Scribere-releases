import { Injectable } from '@angular/core';
import { environment } from '../env/env';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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


export class SearchService {
  private apiUrl = `${environment.apiUrl}/search?q=`;
  private searchResults: any[] = [];

  constructor(private http: HttpClient) { }


  getSearchResults(searchTerm: string): Observable<Page<Article>> {
    const params = new HttpParams().append('q', searchTerm);
    return this.http.get<Page<Article>>(`${environment.apiUrl}/search`, { params });
  }

}
