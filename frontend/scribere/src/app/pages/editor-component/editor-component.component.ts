import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { CommonModule } from '@angular/common';
import { TiptapEditorDirective } from 'ngx-tiptap';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

/**
 * Rich text editor component for article creation and editing
 */
@Component({
  selector: 'app-editor-component',
  templateUrl: './editor-component.component.html',
  styleUrls: ['./editor-component.component.css'],
  standalone: true,
  imports: [CommonModule, TiptapEditorDirective]
})
export class EditorComponent implements OnInit, OnDestroy {
  editor: Editor | null = null;
  private platformId = inject(PLATFORM_ID);
  private sanitizer = inject(DomSanitizer);

  /**
   * Initializes the editor with necessary extensions and configurations
   */
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
        this.editor = new Editor({
            extensions: [
                StarterKit,
                Underline,
                Link.configure({ openOnClick: false }),
                Image,
                TextAlign.configure({ types: ['heading', 'paragraph'] }),
                Placeholder.configure({ placeholder: 'Start writing your story...' }),
            ],
            content: '<p>Hello, write your journey here!</p>',
            autofocus: true,
            editable: true,
        });

        this.loadContentFromLocalStorage();
        this.editor.on('update', () => {
            this.autoSaveInLocalStorage();
        });
    }
  }

  /**
   * Cleans up the editor instance when component is destroyed
   */
  ngOnDestroy() {
    this.editor?.destroy();
  }

  /**
   * Returns the current character count of the editor content
   */
  getCharacterCount(): number {
    if (!this.editor) return 0;
    const text = this.editor.getText();
    return text.length;
  }

  /**
   * Validates if a string is a proper URL
   */
  private isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }

  /**
   * Adds an image to the editor content
   */
  addImage(): void {
    const url = prompt('Image URL:');
    if (url) {
      const sanitizedUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
      if (sanitizedUrl && this.isValidUrl(sanitizedUrl)) {
        this.editor?.chain().focus().setImage({ src: sanitizedUrl }).run();
      } else {
        alert('Invalid image URL.');
      }
    }
  }

  /**
   * Adds a hyperlink to the editor content
   */
  addLink(): void {
    const url = prompt('Link URL:');
    if (url) {
      const sanitizedUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
      if (sanitizedUrl && this.isValidUrl(sanitizedUrl)) {
        this.editor?.chain().focus().setLink({ href: sanitizedUrl }).run();
      } else {
        alert('Invalid link URL.');
      }
    }
  }

  /**
   * Automatically saves editor content to local storage
   */
  autoSaveInLocalStorage(): void {
    if (this.editor) {
      const content = this.editor.getJSON();
      localStorage.setItem('editorContent', JSON.stringify(content));
    }
  }

  /**
   * Loads content from local storage into the editor
   */
  loadContentFromLocalStorage(): void {
    const content = localStorage.getItem('editorContent');
    if (content && this.editor) {
      const parsedContent = JSON.parse(content);
      this.editor.commands.setContent(parsedContent);
    }
  }

  /**
   * Clears saved content from local storage
   */
  clearLocalStorage(): void {
    localStorage.removeItem('editorContent');
  }
}
