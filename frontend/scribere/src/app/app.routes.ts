import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
];
