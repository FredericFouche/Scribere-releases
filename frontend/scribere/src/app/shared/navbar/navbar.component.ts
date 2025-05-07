import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { RouterLink } from '@angular/router';

/**
 * Navigation bar component that provides site-wide navigation
 * and search functionality for the application.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SearchBarComponent,
    RouterLink
  ],
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {
  /**
   * Handles the action when a user clicks to add a new article.
   * Currently logs to console but should be extended to navigate
   * to article creation or trigger a modal.
   */
  addArticle(): void {
    console.log('Add article clicked');
  }
}
