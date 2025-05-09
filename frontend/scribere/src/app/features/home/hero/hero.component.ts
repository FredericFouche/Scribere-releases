import { Component, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TagComponent } from '../../../shared/tag/tag.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  imports: [
    TagComponent
  ],
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  private scrollListener: (() => void) | null = null;
  private parallaxElement: HTMLElement | null = null;

  constructor() {
      this.scrollListener = () => {
        if (!this.parallaxElement) return;

        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollPercentage = Math.min(scrollTop / windowHeight, 1);

        const parallaxOffset = scrollPercentage * 20;
        this.parallaxElement
          .style.setProperty('--parallax-offset', parallaxOffset.toString());
      };
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.parallaxElement = document.querySelector('.parallax');
    if (this.scrollListener) {
      window.addEventListener('scroll', this.scrollListener, { passive: true });
      this.scrollListener();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
}
