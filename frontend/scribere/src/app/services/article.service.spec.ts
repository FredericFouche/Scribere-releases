import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../env/env';
import { Article, ArticleService, Page } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/articles`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getArticles', () => {
    it('should return articles with default parameters', () => {
      const mockPage: Page<Article> = {
        content: [
          {
            id: '1',
            title: 'Test Article',
            slug: 'test-article',
            content: 'Test content',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z'
          }
        ],
        pageable: {
          pageNumber: 0,
          pageSize: 10
        },
        totalElements: 1,
        totalPages: 1,
        last: true
      };

      service.getArticles(0).subscribe(articles => {
        expect(articles).toEqual(mockPage);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=0&size=10&sort=createdAt,desc`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPage);
    });

    it('should return articles with custom page size', () => {
      const customSize = 5;
      const mockPage: Page<Article> = {
        content: [
          {
            id: '1',
            title: 'Test Article',
            slug: 'test-article',
            content: 'Test content',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z'
          }
        ],
        pageable: {
          pageNumber: 1,
          pageSize: customSize
        },
        totalElements: 1,
        totalPages: 1,
        last: true
      };

      service.getArticles(1, customSize).subscribe(articles => {
        expect(articles).toEqual(mockPage);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1&size=5&sort=createdAt,desc`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPage);
    });

    it('should handle errors', () => {
      const errorMessage = 'Server error';

      service.getArticles(0).subscribe({
        next: () => fail('Expected an error, not articles'),
        error: (error) => expect(error.statusText).toBe(errorMessage)
      });

      const req = httpMock.expectOne(`${apiUrl}?page=0&size=10&sort=createdAt,desc`);
      req.flush(errorMessage, { status: 500, statusText: errorMessage });
    });
  });
});
