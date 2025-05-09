import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article/article.service';
import { Article } from '../../model/article.model';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

/**
 * Component responsible for displaying a single article's full content
 */
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ArticleComponent implements OnInit {
  article: Article | null = null;
  isLoading = true;
  error: string | null = null;
  safeContent: SafeHtml = '';
  readonly #articleService: ArticleService = inject(ArticleService);

  constructor(
    private route: ActivatedRoute
  ) {}

  /**
   * Initializes the component by loading the article based on the slug from the route
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadArticleById(id);
      }
    });

    if (this.article) {
      this.safeContent = this.article.content;
    }
  }

  loadArticleById(id: string): void {
    this.isLoading = true;

    this.#articleService.getArticleById(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (article) => {
          this.article = article;
        },
        error: (err) => {
          this.error = err.status === 404 ? 'Article not found.' : 'Error loading article.';
        }
      });
  }
}
