import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleComponent } from './article.component';
import { ArticleService, Article } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

// Mock ArticleService
class MockArticleService {
  getArticleBySlug(slug: string) {
    if (slug === 'discover-java') {
      return of({
        id: '1',
        title: 'Discover Java',
        slug: 'discover-java',
        content: '<p>Content of the Java article</p>',
        createdAt: '2023-10-01T00:00:00Z',
        updatedAt: '2023-10-01T00:00:00Z',
        coverImgUrl: 'https://example.com/java.jpg',
        readTime: 5
      } as Article);
    } else {
      return of(null);
    }
  }
}

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let mockArticleService: MockArticleService;

  beforeEach(async () => {
    mockArticleService = new MockArticleService();

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ArticleComponent],
      providers: [
        { provide: ArticleService, useValue: mockArticleService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'discover-java' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load article based on slug', () => {
    expect(component.article).toBeTruthy();
    expect(component.article?.title).toBe('Discover Java');
  });

  it('should display error message if article is not found', () => {
    spyOn(mockArticleService, 'getArticleBySlug').and.returnValue(of(null));
    component.ngOnInit();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.text-neutral-500');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Article not found.');
  });

  it('should display a loading indicator while loading', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('.animate-spin');
    expect(loadingElement).toBeTruthy();
  });

  it('should display article details correctly', () => {
    const titleElement = fixture.nativeElement.querySelector('h1');
    const contentElement = fixture.nativeElement.querySelector('.text-neutral-700');
    const imageElement = fixture.nativeElement.querySelector('img');

    expect(titleElement.textContent).toBe('Discover Java');
    expect(contentElement.innerHTML).toContain('Content of the Java article');
    expect(imageElement.src).toBe('https://example.com/java.jpg');
  });
});
