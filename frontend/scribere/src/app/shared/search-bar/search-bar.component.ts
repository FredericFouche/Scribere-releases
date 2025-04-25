import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService, Article } from '../../services/search.service';
import { Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchTerm: string = '';
  results: Article[] = [];
  private subscription: Subscription | null = null;
  error: string | null = null;

  constructor(private searchService: SearchService) {
  }

  onSearch() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.error = null;
    this.subscription = this.searchService.getSearchResults(this.searchTerm)
      .pipe(
        catchError(err => {
          this.error = 'An error occurred while fetching search results.';
          console.error(err);
          throw err;
        })
      )
      .subscribe(page => {
        this.results = page.content;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
