import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleComponent } from './article.component';
import { ArticleService, Article } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

// Mock du service ArticleService
class MockArticleService {
  getArticleBySlug(slug: string) {
    if (slug === 'decouvrir-java') {
      return of({
        id: '1',
        title: 'Découvrir Java',
        slug: 'decouvrir-java',
        content: '<p>Contenu de l\'article sur Java</p>',
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
            snapshot: { paramMap: { get: (key: string) => 'decouvrir-java' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('devrait charger l\'article basé sur le slug', () => {
    expect(component.article).toBeTruthy();
    expect(component.article?.title).toBe('Découvrir Java');
  });

  it('devrait afficher un message d\'erreur si l\'article n\'est pas trouvé', () => {
    spyOn(mockArticleService, 'getArticleBySlug').and.returnValue(of(null));
    component.ngOnInit();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.text-neutral-500');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Article non trouvé.');
  });

  it('devrait afficher un indicateur de chargement pendant le chargement', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('.animate-spin');
    expect(loadingElement).toBeTruthy();
  });

  it('devrait afficher les détails de l\'article correctement', () => {
    const titleElement = fixture.nativeElement.querySelector('h1');
    const contentElement = fixture.nativeElement.querySelector('.text-neutral-700');
    const imageElement = fixture.nativeElement.querySelector('img');

    expect(titleElement.textContent).toBe('Découvrir Java');
    expect(contentElement.innerHTML).toContain('Contenu de l\'article sur Java');
    expect(imageElement.src).toBe('https://example.com/java.jpg');
  });
});
