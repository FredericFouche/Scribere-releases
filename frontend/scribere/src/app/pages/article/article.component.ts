import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

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

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadArticle(slug);
    }
  }

  loadArticle(slug: string): void {
    this.isLoading = true;
    this.articleService.getArticles(0)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (page) => {
          this.article = page.content.find((a) => a.slug === slug) || null;
          if (!this.article) {
            this.error = 'Article non trouvé.';
          }
        },
        error: () => {
          this.error = 'Erreur lors du chargement de l\'article.';
        }
      });
  }
}
