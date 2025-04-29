import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';

// Mock des composants utilisés par LayoutComponent
@Component({
  selector: 'app-navbar',
  standalone: true,
  template: '<div class="mock-navbar">Mock Navbar</div>'
})
class MockNavbarComponent {}

@Component({
  selector: 'app-footer',
  standalone: true,
  template: '<div class="mock-footer">Mock Footer</div>'
})
class MockFooterComponent {}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let router: any;
  let eventsSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    // Créer un mock pour les events du Router
    eventsSubject = new BehaviorSubject<any>(new NavigationEnd(0, '/', '/'));

    // Créer un mock complet du Router
    router = {
      url: '/test',
      events: eventsSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [
        LayoutComponent,
        MockNavbarComponent,
        MockFooterComponent,
        RouterOutlet
      ],
      providers: [
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    // Remplacer les composants réels par nos mocks
    TestBed.overrideComponent(LayoutComponent, {
      set: {
        imports: [MockNavbarComponent, MockFooterComponent, RouterOutlet]
      }
    });

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('devrait initialiser isHomePage à false quand l\'URL n\'est pas la page d\'accueil', () => {
    // Configurer l'URL à une page autre que la page d'accueil
    router.url = '/autre-page';
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isHomePage).toBeFalse();
  });

  it('devrait définir isHomePage à true quand l\'URL est la page d\'accueil', () => {
    // Configurer l'URL à la page d'accueil
    router.url = '/';
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isHomePage).toBeTrue();
  });

  it('devrait mettre à jour isHomePage lors de la navigation', () => {
    // Simuler une navigation vers une autre page
    router.url = '/autre-page';
    eventsSubject.next(new NavigationEnd(1, '/autre-page', '/autre-page'));
    fixture.detectChanges();

    expect(component.isHomePage).toBeFalse();

    // Simuler une navigation vers la page d'accueil
    router.url = '/';
    eventsSubject.next(new NavigationEnd(2, '/', '/'));
    fixture.detectChanges();

    expect(component.isHomePage).toBeTrue();
  });

  it('devrait inclure le composant navbar', () => {
    const navbarElement = fixture.debugElement.query(By.css('app-navbar'));
    expect(navbarElement).toBeTruthy();
  });

  it('devrait inclure le composant footer', () => {
    const footerElement = fixture.debugElement.query(By.css('app-footer'));
    expect(footerElement).toBeTruthy();
  });

  it('devrait inclure router-outlet dans main', () => {
    const mainElement = fixture.debugElement.query(By.css('main'));
    expect(mainElement).toBeTruthy();

    const routerOutletElement = mainElement.query(By.css('router-outlet'));
    expect(routerOutletElement).toBeTruthy();
  });

  it('devrait avoir l\'attribut data-is-home reflétant l\'état de isHomePage', () => {
    // D'abord, isHomePage est false
    router.url = '/autre-page';
    component.ngOnInit();
    fixture.detectChanges();

    const layoutContainerFalse = fixture.debugElement.query(By.css('.layout-container')).nativeElement;
    expect(layoutContainerFalse.getAttribute('data-is-home')).toBe('false');

    // Puis on change isHomePage à true
    router.url = '/';
    component.ngOnInit();
    fixture.detectChanges();

    const layoutContainerTrue = fixture.debugElement.query(By.css('.layout-container')).nativeElement;
    expect(layoutContainerTrue.getAttribute('data-is-home')).toBe('true');
  });
});
