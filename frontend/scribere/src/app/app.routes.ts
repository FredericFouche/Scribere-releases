import { Routes } from '@angular/router';
import { LayoutComponent } from './features/layout/layout.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { HomeComponent } from './features/home/home.component';
import { EditorComponent } from './features/editor/editor.component';
import { ArticleComponent } from './features/article/article.component';

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
