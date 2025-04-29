import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TagComponent } from './tag.component';
import { Component } from '@angular/core';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TagComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;

    // Initialisation d'un tag par défaut pour les tests
    component.tag = {
      id: '1',
      name: 'Test Tag',
      slug: 'test-tag'
    };

    fixture.detectChanges();
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher le nom du tag', () => {
    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.textContent.trim()).toBe('Test Tag');
  });

  it('devrait appliquer la classe bg-primary-100 par défaut quand aucune couleur n\'est spécifiée', () => {
    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-primary-100')).toBeTrue();
  });

  it('devrait appliquer la classe bg-primary-100 quand la couleur est "neutral"', () => {
    component.tag.color = 'neutral';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-primary-100')).toBeTrue();
  });

  it('devrait appliquer la classe bg-red-100 quand la couleur est "red"', () => {
    component.tag.color = 'red';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-red-100')).toBeTrue();
  });

  it('devrait appliquer la classe bg-orange-100 quand la couleur est "orange"', () => {
    component.tag.color = 'orange';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-orange-100')).toBeTrue();
  });

  it('devrait appliquer la classe bg-yellow-100 quand la couleur est "yellow"', () => {
    component.tag.color = 'yellow';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-yellow-100')).toBeTrue();
  });

  it('devrait appliquer la classe bg-green-100 quand la couleur est "green"', () => {
    component.tag.color = 'green';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-green-100')).toBeTrue();
  });

  it('devrait appliquer la classe bg-blue-100 quand la couleur est "blue"', () => {
    component.tag.color = 'blue';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-blue-100')).toBeTrue();
  });

  it('devrait appliquer la classe bg-purple-100 quand la couleur est "purple"', () => {
    component.tag.color = 'purple';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-purple-100')).toBeTrue();
  });

  it('devrait générer un UUID si aucun ID n\'est fourni', () => {
    component.tag = {
      id: '',
      name: 'Tag sans ID',
      slug: 'tag-sans-id'
    };

    component.ngOnInit();

    expect(component.tag.id).toBeTruthy();
    expect(component.tag.id.length).toBeGreaterThan(0);
  });

  it('devrait conserver l\'ID existant si un ID est déjà fourni', () => {
    const existingId = 'existing-id-123';

    component.tag = {
      id: existingId,
      name: 'Tag avec ID',
      slug: 'tag-avec-id'
    };

    component.ngOnInit();

    expect(component.tag.id).toBe(existingId);
  });
});
