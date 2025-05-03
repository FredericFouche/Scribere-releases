import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TagComponent } from './tag.component';

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

    component.tag = {
      id: '1',
      name: 'Test Tag',
      slug: 'test-tag'
    };

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the tag name', () => {
    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.textContent.trim()).toBe('Test Tag');
  });

  it('should apply bg-primary-100 class by default when no color is specified', () => {
    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-primary-100')).toBeTrue();
  });

  it('should apply bg-primary-100 class when color is "neutral"', () => {
    component.tag.color = 'neutral';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-primary-100')).toBeTrue();
  });

  it('should apply bg-red-100 class when color is "red"', () => {
    component.tag.color = 'red';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-red-100')).toBeTrue();
  });

  it('should apply bg-orange-100 class when color is "orange"', () => {
    component.tag.color = 'orange';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-orange-100')).toBeTrue();
  });

  it('should apply bg-yellow-100 class when color is "yellow"', () => {
    component.tag.color = 'yellow';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-yellow-100')).toBeTrue();
  });

  it('should apply bg-green-100 class when color is "green"', () => {
    component.tag.color = 'green';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-green-100')).toBeTrue();
  });

  it('should apply bg-blue-100 class when color is "blue"', () => {
    component.tag.color = 'blue';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-blue-100')).toBeTrue();
  });

  it('should apply bg-purple-100 class when color is "purple"', () => {
    component.tag.color = 'purple';
    fixture.detectChanges();

    const tagElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(tagElement.classList.contains('bg-purple-100')).toBeTrue();
  });

  it('should generate a UUID if no ID is provided', () => {
    component.tag = {
      id: '',
      name: 'Tag without ID',
      slug: 'tag-without-id'
    };

    component.ngOnInit();

    expect(component.tag.id).toBeTruthy();
    expect(component.tag.id.length).toBeGreaterThan(0);
  });

  it('should keep existing ID if one is already provided', () => {
    const existingId = 'existing-id-123';

    component.tag = {
      id: existingId,
      name: 'Tag with ID',
      slug: 'tag-with-id'
    };

    component.ngOnInit();

    expect(component.tag.id).toBe(existingId);
  });
});
