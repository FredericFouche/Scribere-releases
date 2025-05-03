import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';

// Mock components used by LayoutComponent
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
    // Create a mock for Router events
    eventsSubject = new BehaviorSubject<any>(new NavigationEnd(0, '/', '/'));

    // Create a complete Router mock
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

    // Replace real components with our mocks
    TestBed.overrideComponent(LayoutComponent, {
      set: {
        imports: [MockNavbarComponent, MockFooterComponent, RouterOutlet]
      }
    });

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isHomePage to false when URL is not home page', () => {
    // Set URL to a page other than home
    router.url = '/other-page';
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isHomePage).toBeFalse();
  });

  it('should set isHomePage to true when URL is home page', () => {
    // Set URL to home page
    router.url = '/';
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isHomePage).toBeTrue();
  });

  it('should update isHomePage during navigation', () => {
    // Simulate navigation to another page
    router.url = '/other-page';
    eventsSubject.next(new NavigationEnd(1, '/other-page', '/other-page'));
    fixture.detectChanges();

    expect(component.isHomePage).toBeFalse();

    // Simulate navigation to home page
    router.url = '/';
    eventsSubject.next(new NavigationEnd(2, '/', '/'));
    fixture.detectChanges();

    expect(component.isHomePage).toBeTrue();
  });

  it('should include the navbar component', () => {
    const navbarElement = fixture.debugElement.query(By.css('app-navbar'));
    expect(navbarElement).toBeTruthy();
  });

  it('should include the footer component', () => {
    const footerElement = fixture.debugElement.query(By.css('app-footer'));
    expect(footerElement).toBeTruthy();
  });

  it('should include router-outlet in main', () => {
    const mainElement = fixture.debugElement.query(By.css('main'));
    expect(mainElement).toBeTruthy();

    const routerOutletElement = mainElement.query(By.css('router-outlet'));
    expect(routerOutletElement).toBeTruthy();
  });

  it('should have data-is-home attribute reflecting the state of isHomePage', () => {
    // Initially, isHomePage is false
    router.url = '/other-page';
    component.ngOnInit();
    fixture.detectChanges();

    const layoutContainerFalse = fixture.debugElement.query(By.css('.layout-container')).nativeElement;
    expect(layoutContainerFalse.getAttribute('data-is-home')).toBe('false');

    // Then change isHomePage to true
    router.url = '/';
    component.ngOnInit();
    fixture.detectChanges();

    const layoutContainerTrue = fixture.debugElement.query(By.css('.layout-container')).nativeElement;
    expect(layoutContainerTrue.getAttribute('data-is-home')).toBe('true');
  });
});
