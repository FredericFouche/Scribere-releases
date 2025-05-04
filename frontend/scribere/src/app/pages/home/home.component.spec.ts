import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { ArticleService, Article, Page } from '../../services/article.service';
import { of } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

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

class MockStripHtmlPipe {
  transform(value: string): string {
    return value.replace(/<[^>]*>/g, '');
  }
}

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'First article',
    content: '<p>Content of the first article</p>',
    slug: 'first-article',
    coverImgUrl: 'https://example.com/image1.jpg',
    readTime: 5,
    createdAt: '2025-04-01T12:00:00Z',
    updatedAt: '2025-04-01T12:00:00Z'
  },
  {
    id: '2',
    title: 'Second article',
    content: '<p>Content of the second article</p>',
    slug: 'second-article',
    coverImgUrl: 'https://example.com/image2.jpg',
    readTime: 3,
    createdAt: '2025-04-02T12:00:00Z',
    updatedAt: '2025-04-02T12:00:00Z'
  }
];

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

class MockArticleService {
  getArticles() {
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
              paramMap: { get: () => null },
              queryParamMap: { get: () => null }
            }
          }
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .overrideComponent(HomeComponent, {
      set: {
        imports: [CommonModule, RouterModule, MockHeroComponent, MockTagComponent],
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
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load articles during initialization', () => {
    expect(component.articles.length).toBe(2);
    expect(component.articles[0].title).toBe('First article');
    expect(component.articles[1].title).toBe('Second article');
  });

  it('should update currentPage after loading articles', () => {
    expect(component.currentPage).toBe(1);
  });

  it('should set hasMorePages to true when the page is not the last one', () => {
    expect(component.hasMorePages).toBeTrue();
  });

  it('should display a loading indicator when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('.animate-spin'));
    expect(loadingElement).toBeTruthy();
  });

  it('should call loadArticles when loadMore is called', () => {
    spyOn(component, 'loadArticles');

    component.loadMore();

    expect(component.loadArticles).toHaveBeenCalled();
  });

  it('should not call getArticles if isLoading is true', () => {
    const spy = spyOn(articleService, 'getArticles');
    component.isLoading = true;

    component.loadArticles();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should not call getArticles if hasMorePages is false', () => {
    const spy = spyOn(articleService, 'getArticles');
    component.hasMorePages = false;

    component.loadArticles();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should include the HeroComponent', () => {
    const heroElement = fixture.debugElement.query(By.css('app-hero'));
    expect(heroElement).toBeTruthy();
  });

  it('should display tags for each article', () => {
    const tagElements = fixture.debugElement.queryAll(By.css('app-tag'));
    expect(tagElements.length).toBeGreaterThan(0);
  });

  it('should display a "Load more" button when hasMorePages is true and isLoading is false', () => {
    component.hasMorePages = true;
    component.isLoading = false;
    fixture.detectChanges();

    const loadMoreButton = fixture.debugElement.query(By.css('button'));
    expect(loadMoreButton).toBeTruthy();
    expect(loadMoreButton.nativeElement.textContent).toContain('Load more articles');
  });

  it('should not display a "Load more" button when hasMorePages is false', () => {
    component.hasMorePages = false;
    fixture.detectChanges();

    const loadMoreButton = fixture.debugElement.query(By.css('button'));
    expect(loadMoreButton).toBeFalsy();
  });

  it('should display "Latest Articles" on the page', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent.trim()).toBe('Latest Articles');
  });

  it('should display the formatted date for each article', () => {
    const dateElements = fixture.debugElement.queryAll(By.css('.text-neutral-500 span:nth-child(3)'));
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it('should display the reading time for each article', () => {
    const readTimeElements = fixture.debugElement.queryAll(By.css('.text-neutral-500 span:nth-child(5)'));
    expect(readTimeElements.length).toBeGreaterThan(0);
  });

  it('should display the "Read More" link for each article', () => {
    const readMoreLinks = fixture.debugElement.queryAll(By.css('a.btn-ghost'));
    expect(readMoreLinks.length).toBe(component.articles.length);
    expect(readMoreLinks[0].nativeElement.textContent).toContain('Read More');
  });

  it('should have links to articles with correct URLs', () => {
    const readMoreLinks = fixture.debugElement.queryAll(By.css('a.btn-ghost'));
    expect(readMoreLinks[0].attributes['ng-reflect-router-link']).toContain('/articles,first-article');
    expect(readMoreLinks[1].attributes['ng-reflect-router-link']).toContain('/articles,second-article');
  });

  it('should display a message when no articles are available', () => {
    component.articles = [];
    component.isLoading = false;
    fixture.detectChanges();

    const noArticlesMessage = fixture.debugElement.query(By.css('.text-neutral-500'));
    expect(noArticlesMessage).toBeTruthy();
    expect(noArticlesMessage.nativeElement.textContent.trim()).toContain('No articles found');
  });
});
