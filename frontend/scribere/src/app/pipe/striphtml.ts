import { Pipe, PipeTransform } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Pipe({
  name: 'stripHtml',
  standalone: true
})
export class StripHtmlPipe implements PipeTransform {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Si nous sommes dans un navigateur, utiliser DOMParser
    if (isPlatformBrowser(this.platformId)) {
      const doc = new DOMParser().parseFromString(value, 'text/html');
      return doc.body.textContent || '';
    }
    // Si nous sommes sur le serveur, utiliser une méthode compatible SSR
    else if (isPlatformServer(this.platformId)) {
      // Solution simple pour le SSR : supprimer les balises HTML avec une regex
      return value.replace(/<[^>]*>/g, '');
    }

    return value;
  }
}
