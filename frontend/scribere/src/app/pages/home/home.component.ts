import { Component, inject, OnInit } from '@angular/core';
import { Article } from '../../model/article.model';
import { ArticleService, Page } from '../../services/article.service';
import { finalize } from 'rxjs';
import { StripHtmlPipe } from '../../pipe/striphtml';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { TagComponent } from '../../shared/tag/tag.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    StripHtmlPipe,
    CommonModule,
    RouterModule,
    HeroComponent,
    TagComponent
  ],
  providers: [
    ArticleService
  ]
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  currentPage = 0;
  isLoading = false;
  hasMorePages = true;
  readonly #articleService: ArticleService = inject(ArticleService);

  constructor(
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    if (this.isLoading || !this.hasMorePages) return;

    this.isLoading = true;
    this.#articleService.getArticles(this.currentPage)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (page: Page<Article>) => {
          this.articles = [...this.articles, ...page.content];
          this.hasMorePages = !page.last;
          this.currentPage++;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des articles', error);
        }
      });
  }

  loadMore(): void {
    this.loadArticles();
  }
}
