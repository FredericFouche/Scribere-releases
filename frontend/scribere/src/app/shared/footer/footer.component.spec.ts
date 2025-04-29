import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';

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

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('devrait contenir un lien vers la page About', () => {
    const aboutLink = fixture.debugElement.query(By.css('a[href="/about"]')).nativeElement;
    expect(aboutLink).toBeTruthy();
    expect(aboutLink.textContent.trim()).toBe('About');
  });

  it('devrait contenir un lien vers la page Privacy', () => {
    const privacyLink = fixture.debugElement.query(By.css('a[href="/privacy"]')).nativeElement;
    expect(privacyLink).toBeTruthy();
    expect(privacyLink.textContent.trim()).toBe('Privacy');
  });

  it('devrait contenir un lien vers la page Terms', () => {
    const termsLink = fixture.debugElement.query(By.css('a[href="/terms"]')).nativeElement;
    expect(termsLink).toBeTruthy();
    expect(termsLink.textContent.trim()).toBe('Terms');
  });

  it('devrait contenir un lien vers la page Contact', () => {
    const contactLink = fixture.debugElement.query(By.css('a[href="/contact"]')).nativeElement;
    expect(contactLink).toBeTruthy();
    expect(contactLink.textContent.trim()).toBe('Contact');
    expect(contactLink.classList.contains('hidden')).toBeTrue();
    expect(contactLink.classList.contains('md:block')).toBeTrue();
  });

  it('devrait contenir un lien vers la page Help', () => {
    const helpLink = fixture.debugElement.query(By.css('a[href="/help"]')).nativeElement;
    expect(helpLink).toBeTruthy();
    expect(helpLink.textContent.trim()).toBe('Help');
  });

  it('devrait avoir la classe bg-neutral-800 sur le footer', () => {
    const footerElement = fixture.debugElement.query(By.css('footer')).nativeElement;
    expect(footerElement.classList.contains('bg-neutral-800')).toBeTrue();
  });

  it('devrait avoir un layout responsive avec des classes flex', () => {
    const linksContainer = fixture.debugElement.query(By.css('div')).nativeElement;
    expect(linksContainer.classList.contains('flex')).toBeTrue();
    expect(linksContainer.classList.contains('flex-row')).toBeTrue();
    expect(linksContainer.classList.contains('md:justify-between')).toBeTrue();
  });
});
