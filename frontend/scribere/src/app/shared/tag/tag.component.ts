import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from '../../model/tag.model';


@Component({
  selector: 'app-tag',
  imports: [
    CommonModule
  ],
  templateUrl: './tag.component.html',
  standalone: true
})

/**
 * TagComponent is a reusable component that displays a tag with a name and color.
 */
export class TagComponent {
  @Input() tag!: Tag;

  ngOnInit() {
    if (!this.tag.id) {
      this.tag.id = uuidv4();
    }
  }
}
