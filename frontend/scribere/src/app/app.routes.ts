import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeComponent } from './pages/home/home.component';
import { EditorComponent } from './pages/editor/editor.component';
import { ArticleComponent } from './pages/article/article.component';

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
      },
    ]
  },
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'articles/:slug',
    component: ArticleComponent,
    data: {
      renderMode: 'client'
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
