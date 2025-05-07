import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

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
  readonly #articleService: ArticleService = inject(ArticleService);

  constructor(
    private route: ActivatedRoute
  ) {}

  /**
   * Initializes the component by loading the article based on the slug from the route
   */
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadArticle(slug);
    }
  }

  /**
   * Fetches the article data from the API based on slug
   * @param slug - The unique identifier for the article
   */
  loadArticle(slug: string): void {

    this.isLoading = true;

    this.#articleService.getArticles(0)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (page) => {
          this.article = page.content.find((a) => a.slug === slug) || null;
          if (!this.article) {
            this.error = 'Article not found.';
          }
        },
        error: () => {
          this.error = 'Error loading article.';
        }
      });
  }
}
