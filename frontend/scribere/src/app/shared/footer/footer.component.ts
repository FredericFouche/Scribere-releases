import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Footer component that provides site-wide links for legal information,
 * help resources, and contact options.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {}
