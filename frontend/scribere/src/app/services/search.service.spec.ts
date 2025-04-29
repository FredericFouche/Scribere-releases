import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService, Article } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  // Données factices à renvoyer
  const mockArticles: Article[] = [
    {
      id: '42',
      title: 'Intro à Angular Testing',
      slug: 'intro-angular-testing',
      coverImgUrl: null,
      readTime: 5,
      content: 'Lorem ipsum…',
      createdAt: '2025-04-01T10:00:00Z',
      updatedAt: '2025-04-01T10:00:00Z'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });

    service   = TestBed.inject(SearchService);
    httpMock  = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // S’assure qu’aucune requête pendante ne traîne
    httpMock.verify();
  });

  it('should call GET /api/search?q=… and return articles', () => {
    service.getSearchResults('angular').subscribe(articles => {
      expect(articles).toEqual(mockArticles);
    });

    // 1. On intercepte LA requête attendue
    const req = httpMock.expectOne(
      r => r.method === 'GET' &&
           r.url   === 'http://localhost:8080/api/search' &&
           r.params.get('q') === 'angular'
    );

    // 2. On peut tester headers, body, etc.
    expect(req.request.responseType).toBe('json');

    // 3. On renvoie une “réponse serveur” factice
    req.flush(mockArticles);
  });

  it('should propagate backend errors', () => {
    const status   = 500;
    const statusText = 'Server Error';

    service.getSearchResults('oops').subscribe({
      next: () => fail('should have errored'),
      error:   err => {
        expect(err.status).toBe(status);
        expect(err.statusText).toBe(statusText);
      }
    });

    const req = httpMock.expectOne('http://localhost:8080/api/search?q=oops');
    req.flush({ message: 'Boom' }, { status, statusText });
  });
});
