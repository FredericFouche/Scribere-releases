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
    title: 'Scribere',
    children: [
      {
        path: '',
        component: LandingPageComponent,
        title: 'Scribere - Where story becomes a reality'
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Scribere - Scrolling through the pages of journey',
      },
    ]
  },
  {
    path: 'editor',
    component: EditorComponent,
    title: 'Scribere - Write your story',
  },
  {
    path: 'articles/:id/:slug',
    component: ArticleComponent,
    title: 'Scribere - Article',
  },
  {
    path: '**',
    redirectTo: ''
  }
];
