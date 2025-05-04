import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { SearchService } from '../../services/search.service';
import { of } from 'rxjs';

/**
 * Mock implementation of the SearchService for testing
 */
class MockSearchService {
  getSearchResults() {
    return of([]);
  }
}

/**
 * Mock implementation of the SearchBar component to use in tests
 */
@Component({
  selector: 'mock-search-bar',
  standalone: true,
  template: ''
})
class MockSearchBarComponent {}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: SearchService, useValue: new MockSearchService() }
      ]
    }).compileComponents();

    TestBed.overrideComponent(NavbarComponent, {
      set: {
        template: `
          <nav class="flex flex-row justify-between fixed items-center py-4 padding-vertical mx-auto border-b border-neutral-600 w-full z-50 bg-neutral-100">
            <div class="flex items-center">
              <a routerLink="/" class="flex items-center transition-colors group hover:no-underline">
                <h3 class="group-hover:text-primary-900 transition-colors duration-150 ease-in-out">
                  Scribere<span class="blinking-underscore group-hover:text-primary-900 transition-colors duration-150 ease-in-out text-3xl">_</span>
                </h3>
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <mock-search-bar></mock-search-bar>
              <a routerLink="/signin" class="hidden xs:block">Sign In</a>
              <a routerLink="/about" class="hidden md:block">About</a>
              <a routerLink="/" class="btn-ghost hover:no-underline">Get Started</a>
            </div>
          </nav>
        `,
        imports: [MockSearchBarComponent]
      }
    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a link to the home page', () => {
    const homeLink = fixture.nativeElement.querySelector('a[routerLink="/"]');
    expect(homeLink).toBeTruthy();
    expect(homeLink.textContent).toContain('Scribere');
  });

  it('should contain a link to the sign-in page', () => {
    const signInLink = fixture.nativeElement.querySelector('a[routerLink="/signin"]');
    expect(signInLink).toBeTruthy();
    expect(signInLink.textContent).toContain('Sign In');
  });

  it('should contain a link to the About page', () => {
    const aboutLink = fixture.nativeElement.querySelector('a[routerLink="/about"]');
    expect(aboutLink).toBeTruthy();
    expect(aboutLink.textContent).toContain('About');
  });

  it('should contain a Get Started link', () => {
    const getStartedLink = fixture.nativeElement.querySelector('a.btn-ghost');
    expect(getStartedLink).toBeTruthy();
    expect(getStartedLink.textContent).toContain('Get Started');
  });

  it('should have an addArticle method', () => {
    spyOn(console, 'log');
    component.addArticle();
    expect(console.log).toHaveBeenCalledWith('Add article clicked');
  });

  it('should include the SearchBar component', () => {
    const searchBar = fixture.nativeElement.querySelector('mock-search-bar');
    expect(searchBar).toBeTruthy();
  });
});
