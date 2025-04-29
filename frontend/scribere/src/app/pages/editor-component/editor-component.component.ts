import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { CommonModule } from '@angular/common';
import { TiptapEditorDirective } from 'ngx-tiptap';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';


@Component({
  selector: 'app-editor-component',
  templateUrl: './editor-component.component.html',
  styleUrls: ['./editor-component.component.css'],
  standalone: true,
  imports: [CommonModule,
    TiptapEditorDirective]
})
export class EditorComponent implements OnInit, OnDestroy {
  editor: Editor | null = null;
  private platformId = inject(PLATFORM_ID);
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.editor = new Editor({
        extensions: [
          StarterKit,
          Underline,
          Link.configure({
            openOnClick: false,
          }),
          Image,
          TextAlign.configure({
            types: ['heading', 'paragraph'],
          }),
          Placeholder.configure({
            placeholder: 'Commencez à écrire votre histoire...',
          }),
        ],
        content: '<p>Hello, write your journey here!</p>',
        autofocus: true,
        editable: true,
      });
    }
  }

  ngOnDestroy() {
    this.editor?.destroy();
  }

  getCharacterCount() {
    if (!this.editor) return 0;
    const text = this.editor.getText();
    return text.length;
  }

  private isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }

  addImage() {
    const url = prompt('URL de l\'image:');
    if (url) {
      const sanitizedUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
      if (sanitizedUrl && this.isValidUrl(sanitizedUrl)) {
        this.editor?.chain().focus().setImage({ src: sanitizedUrl }).run();
      } else {
        alert('URL d\'image non valide.');
      }
    }
  }

  addLink() {
    const url = prompt('URL du lien:');
    if (url) {
      const sanitizedUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
      if (sanitizedUrl && this.isValidUrl(sanitizedUrl)) {
        this.editor?.chain().focus().setLink({ href: sanitizedUrl }).run();
      } else {
        alert('URL du lien non valide.');
      }
    }
  }
}
