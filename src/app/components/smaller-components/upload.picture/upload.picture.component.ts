import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PictureUploadService} from "../../../service/picture.upload.service";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {Store} from "@ngrx/store";
import * as UserActions from "../../../ngrx-store/actions/user.actions";

@Component({
  selector: 'upload-picture',
  templateUrl: './upload.picture.component.html',
  styleUrls: ['./upload.picture.component.css']
})
export class UploadPictureComponent {

  @Input("userImage") userImage: string = "";
  @Output() closeWindowEvent = new EventEmitter<void>;
  selectedImage?: File;
  preview = "";

  constructor(private pictureUploadService: PictureUploadService, private store: Store) {
  }

  selectPicture(picture: any): void {
    const file: File = picture.target.files[0];
    this.selectedImage = file;

    const reader = new FileReader();

    reader.onload = (e:any) => {
      this.preview = e.target.result;
    };

    reader.readAsDataURL(file);
  }


  uploadImage() {
    if(this.selectedImage){
      const file: File = this.selectedImage;
      this.store.dispatch(UserActions.updateUserPicture({file: file, imageString: this.preview}))
      setTimeout(() => {
        this.closeWindowEvent.emit();
      }, 1000)
    }
  }


  closeWindowOutsideClick($event: MouseEvent) {
    if ($event.target == $event.currentTarget) {
      this.closeWindowEvent.emit();
    }
  }
}
