import { Component, OnInit } from '@angular/core';
import { Article, ArticleService, Page } from '../../services/article.service';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  currentPage = 0;
  isLoading = false;
  hasMorePages = true;

  constructor(
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    if (this.isLoading || !this.hasMorePages) return;

    this.isLoading = true;
    this.articleService.getArticles(this.currentPage)
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
