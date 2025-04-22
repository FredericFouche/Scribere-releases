import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-layout',
  imports: [
    NavbarComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
