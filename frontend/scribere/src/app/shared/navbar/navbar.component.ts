import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SearchBarComponent,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  addArticle() {
    console.log('Add article clicked');
  }

}
