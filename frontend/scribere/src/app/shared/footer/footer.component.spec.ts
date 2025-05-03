import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';
import { provideRouter } from '@angular/router';

/**
 * Test suite for the FooterComponent
 */
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent
      ],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // Navigation tests
  it('should contain a link to the About page', () => {
    const aboutLink = fixture.debugElement.query(By.css('a[href="/about"]')).nativeElement;
    expect(aboutLink).toBeTruthy();
    expect(aboutLink.textContent.trim()).toBe('About');
  });

  it('should contain a link to the Privacy page', () => {
    const privacyLink = fixture.debugElement.query(By.css('a[href="/privacy"]')).nativeElement;
    expect(privacyLink).toBeTruthy();
    expect(privacyLink.textContent.trim()).toBe('Privacy');
  });

  it('should contain a link to the Terms page', () => {
    const termsLink = fixture.debugElement.query(By.css('a[href="/terms"]')).nativeElement;
    expect(termsLink).toBeTruthy();
    expect(termsLink.textContent.trim()).toBe('Terms');
  });

  it('should contain a link to the Contact page', () => {
    const contactLink = fixture.debugElement.query(By.css('a[href="/contact"]')).nativeElement;
    expect(contactLink).toBeTruthy();
    expect(contactLink.textContent.trim()).toBe('Contact');
    expect(contactLink.classList.contains('hidden')).toBeTrue();
    expect(contactLink.classList.contains('md:block')).toBeTrue();
  });

  it('should contain a link to the Help page', () => {
    const helpLink = fixture.debugElement.query(By.css('a[href="/help"]')).nativeElement;
    expect(helpLink).toBeTruthy();
    expect(helpLink.textContent.trim()).toBe('Help');
  });

  // Layout tests
  it('should have the class bg-neutral-800 on the footer', () => {
    const footerElement = fixture.debugElement.query(By.css('footer')).nativeElement;
    expect(footerElement.classList.contains('bg-neutral-800')).toBeTrue();
  });

  it('should have a responsive layout with flex classes', () => {
    const linksContainer = fixture.debugElement.query(By.css('div')).nativeElement;
    expect(linksContainer.classList.contains('flex')).toBeTrue();
    expect(linksContainer.classList.contains('flex-row')).toBeTrue();
    expect(linksContainer.classList.contains('md:justify-between')).toBeTrue();
  });
});
