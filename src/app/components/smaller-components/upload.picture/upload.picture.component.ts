import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'upload-picture',
  templateUrl: './upload.picture.component.html',
  styleUrls: ['./upload.picture.component.css']
})
export class UploadPictureComponent {

  @Output() closeWindowEvent = new EventEmitter<void>;

  closeWindowOutsideClick($event: MouseEvent) {
    if ($event.target == $event.currentTarget) {
      this.closeWindowEvent.emit();
    }
  }
}
