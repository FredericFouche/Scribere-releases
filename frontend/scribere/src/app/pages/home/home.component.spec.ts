import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { ArticleService, Article, Page } from '../../services/article.service';
import { of, throwError } from 'rxjs';
import { TagComponent } from '../../shared/tag/tag.component';
import { StripHtmlPipe } from '../../pipe/striphtml';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

// Mock des composants utilisés dans HomeComponent
@Component({
  selector: 'app-hero',
  standalone: true,
  template: '<div class="mock-hero">Hero Component</div>'
})
class MockHeroComponent {}

@Component({
  selector: 'app-tag',
  standalone: true,
  template: '<div class="mock-tag">{{ tag.name }}</div>',
  inputs: ['tag']
})
class MockTagComponent {
  tag: any;
}

// Mock du pipe StripHtml
class MockStripHtmlPipe {
  transform(value: string): string {
    return value.replace(/<[^>]*>/g, '');
  }
}

// Création de données de test
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Premier article',
    content: '<p>Contenu du premier article</p>',
    slug: 'premier-article',
    coverImgUrl: 'https://example.com/image1.jpg',
    readTime: 5,
    createdAt: '2025-04-01T12:00:00Z',
    updatedAt: '2025-04-01T12:00:00Z'
  },
  {
    id: '2',
    title: 'Deuxième article',
    content: '<p>Contenu du deuxième article</p>',
    slug: 'deuxieme-article',
    coverImgUrl: 'https://example.com/image2.jpg',
    readTime: 3,
    createdAt: '2025-04-02T12:00:00Z',
    updatedAt: '2025-04-02T12:00:00Z'
  }
];

// Création d'une page mock
const mockPage: Page<Article> = {
  content: mockArticles,
  pageable: {
    pageNumber: 0,
    pageSize: 2
  },
  totalElements: 4,
  totalPages: 2,
  last: false
};

// Mock du service d'articles
class MockArticleService {
  getArticles(page: number) {
    return of(mockPage);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let articleService: MockArticleService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        StripHtmlPipe,
        MockHeroComponent,
        MockTagComponent
      ],
      providers: [
        { provide: ArticleService, useClass: MockArticleService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map()),
            queryParamMap: of(new Map()),
            snapshot: {
              paramMap: {
                get: () => null
              },
              queryParamMap: {
                get: () => null
              }
            }
          }
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .overrideComponent(HomeComponent, {
      set: {
        imports: [CommonModule, RouterModule, StripHtmlPipe, MockHeroComponent, MockTagComponent],
        providers: [{ provide: ArticleService, useClass: MockArticleService }]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    articleService = TestBed.inject(ArticleService) as unknown as MockArticleService;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Vérifier qu'il n'y a pas de requêtes HTTP en attente après chaque test
    httpTestingController.verify();
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('devrait charger les articles lors de l\'initialisation', () => {
    // Le composant a déjà été initialisé dans beforeEach
    expect(component.articles.length).toBe(2);
    expect(component.articles[0].title).toBe('Premier article');
    expect(component.articles[1].title).toBe('Deuxième article');
  });

  it('devrait mettre à jour currentPage après chargement des articles', () => {
    expect(component.currentPage).toBe(1); // Commence à 0 et est incrémenté après chargement
  });

  it('devrait mettre hasMorePages à true quand la page n\'est pas la dernière', () => {
    expect(component.hasMorePages).toBeTrue();
  });

  it('devrait afficher un indicateur de chargement lorsque isLoading est true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('.animate-spin'));
    expect(loadingElement).toBeTruthy();
  });

  it('devrait appeler loadArticles lorsque loadMore est appelé', () => {
    spyOn(component, 'loadArticles');

    component.loadMore();

    expect(component.loadArticles).toHaveBeenCalled();
  });

  it('ne devrait pas appeler getArticles si isLoading est true', () => {
    const spy = spyOn(articleService, 'getArticles');
    component.isLoading = true;

    component.loadArticles();

    expect(spy).not.toHaveBeenCalled();
  });

  it('ne devrait pas appeler getArticles si hasMorePages est false', () => {
    const spy = spyOn(articleService, 'getArticles');
    component.hasMorePages = false;

    component.loadArticles();

    expect(spy).not.toHaveBeenCalled();
  });

  it('devrait inclure le composant HeroComponent', () => {
    const heroElement = fixture.debugElement.query(By.css('app-hero'));
    expect(heroElement).toBeTruthy();
  });

  it('devrait afficher les tags pour chaque article', () => {
    // Assumer que les articles et leurs tags sont affichés dans le template
    const tagElements = fixture.debugElement.queryAll(By.css('app-tag'));
    expect(tagElements.length).toBeGreaterThan(0);
  });

  it('devrait afficher un bouton "Load more" quand hasMorePages est true et isLoading est false', () => {
    component.hasMorePages = true;
    component.isLoading = false;
    fixture.detectChanges();

    const loadMoreButton = fixture.debugElement.query(By.css('button'));
    expect(loadMoreButton).toBeTruthy();
    expect(loadMoreButton.nativeElement.textContent).toContain('Load more articles');
  });

  it('ne devrait pas afficher de bouton "Load more" quand hasMorePages est false', () => {
    component.hasMorePages = false;
    fixture.detectChanges();

    const loadMoreButton = fixture.debugElement.query(By.css('button'));
    expect(loadMoreButton).toBeFalsy();
  });

  it('devrait afficher le titre "Latest Articles" sur la page', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent.trim()).toBe('Latest Articles');
  });

  it('devrait afficher la date formatée pour chaque article', () => {
    const dateElements = fixture.debugElement.queryAll(By.css('.text-neutral-500 span:nth-child(3)'));
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it('devrait afficher le temps de lecture pour chaque article', () => {
    const readTimeElements = fixture.debugElement.queryAll(By.css('.text-neutral-500 span:nth-child(5)'));
    expect(readTimeElements.length).toBeGreaterThan(0);
  });

  it('devrait afficher le lien "Read More" pour chaque article', () => {
    const readMoreLinks = fixture.debugElement.queryAll(By.css('a.btn-ghost'));
    expect(readMoreLinks.length).toBe(component.articles.length);
    expect(readMoreLinks[0].nativeElement.textContent).toContain('Read More');
  });

  it('devrait avoir des liens vers les articles avec les bonnes URLs', () => {
    const readMoreLinks = fixture.debugElement.queryAll(By.css('a.btn-ghost'));
    expect(readMoreLinks[0].attributes['ng-reflect-router-link']).toContain('/articles,premier-article');
    expect(readMoreLinks[1].attributes['ng-reflect-router-link']).toContain('/articles,deuxieme-article');
  });

  it('devrait afficher un message quand aucun article n\'est disponible', () => {
    component.articles = [];
    component.isLoading = false;
    fixture.detectChanges();

    const noArticlesMessage = fixture.debugElement.query(By.css('.text-neutral-500'));
    expect(noArticlesMessage).toBeTruthy();
    expect(noArticlesMessage.nativeElement.textContent.trim()).toContain('No articles found');
  });
});
