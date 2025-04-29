import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService, Article } from '../../services/search.service';
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
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit, OnDestroy {
  results: Article[] = [];
  private subscription: Subscription | null = null;
  error: string | null = null;
  private searchTerms = new Subject<string>();
  searchTerm: string = '';

  constructor(private searchService: SearchService) {
  }

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

  onSearchInput() {
    this.searchTerms.next(this.searchTerm);
  }

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

  onClear() {
    this.searchTerm = '';
    this.results = [];
    this.error = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @ViewChild('searchContainer') searchContainer!: ElementRef;

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

  highlightSearchTerm(text: string): string {
    if (!this.searchTerm.trim() || !text) {
      return text;
    }
    const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapeRegExp(this.searchTerm.trim())})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }
}
