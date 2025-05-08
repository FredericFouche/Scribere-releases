import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../../model/article.model';
import { SearchService } from '../../services/search/search.service';
import { Subscription, catchError } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './search-bar.component.html'
})

/**
 * SearchBarComponent is a component that provides a search bar functionality.
 */
export class SearchBarComponent implements OnInit, OnDestroy {
  private searchTerms = new Subject<string>();
  private subscription: Subscription | null = null;
  results: Article[] = [];
  error: string | null = null;
  searchTerm: string = '';

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(term => {
      if (!term) {
        this.results = [];
        return;
      }
      this.performSearch(term);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Handles the input event of the search bar.
   */
  onSearchInput() {
    this.searchTerms.next(this.searchTerm);
  }

  /**
   * Performs the search operation.
   * @param term The search term.
   */
  performSearch(term: string) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (!this.searchTerm.trim()) {
      this.results = [];
      return;
    }

    this.error = null;
    this.subscription = this.searchService.getSearchResults(this.searchTerm)
      .pipe(
        catchError(err => {
          this.error = 'An error occurred while fetching search results.';
          console.error('Erreur de recherche:', err);
          throw err;
        })
      )
      .subscribe(results => {
        console.log('Résultats reçus:', results);
        this.results = results;
      });
  }

  /**
   * Clears the search term and results.
   */
  onClear() {
    this.searchTerm = '';
    this.results = [];
    this.error = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  /**
   * Reference to the search container element.
   */
  @ViewChild('searchContainer') searchContainer!: ElementRef;

  /**
   * Listens for click events outside the search container to clear the search.
   * @param event The click event.
   */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      this.searchTerm.trim().length > 0 &&
      this.searchContainer &&
      !this.searchContainer.nativeElement.contains(event.target)
    ) {
      this.onClear();
    }
  }

  /**
   * Highlights the search term in the given text.
   * @param text The text to highlight the search term in.
   * @returns The text with the search term highlighted.
   */
  highlightSearchTerm(text: string): string {
    if (!this.searchTerm.trim() || !text) {
      return text;
    }
    const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapeRegExp(this.searchTerm.trim())})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }
}
