import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UUID } from 'node:crypto';

interface Tag {
  id: UUID;
  name: string;
  slug: string;
  color?: string;
}

@Component({
  selector: 'app-tag',
  imports: [
    CommonModule
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
  standalone: true

})
export class TagComponent {
  @Input() tag!: Tag;
}
