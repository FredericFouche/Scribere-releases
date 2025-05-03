import { Pipe, PipeTransform } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

/**
 * Pipe that safely removes HTML tags from a string.
 * Works in both browser and server-side rendering environments.
 *
 * Usage:
 * ```html
 * {{ htmlContent | stripHtml }}
 * ```
 */
@Pipe({
  name: 'stripHtml',
  standalone: true
})
export class StripHtmlPipe implements PipeTransform {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Transforms an HTML string into plain text by removing all HTML tags.
   *
   * @param value - The HTML string to transform
   * @returns A plain text string with all HTML tags removed
   */
  transform(value: string): string {
    if (!value) {
      return '';
    }

    if (isPlatformBrowser(this.platformId)) {
      const doc = new DOMParser().parseFromString(value, 'text/html');
      return doc.body.textContent || '';
    }

    if (isPlatformServer(this.platformId)) {
      return value.replace(/<[^>]*>/g, '');
    }

    return value;
  }
}
