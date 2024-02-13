import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/Interfaces/Profile';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent {
  @Input() profile: Profile | null = null;
  @Input() edit: boolean = false; 
  @Output() ifCrop = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * sends boolean to parent ifCrop in image-upload is active
   * @param event croping
   */
  updateParent(event: boolean) {
    this.ifCrop.emit(event);
  }
}
