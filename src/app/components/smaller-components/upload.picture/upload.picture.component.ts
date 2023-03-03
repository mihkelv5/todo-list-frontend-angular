import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PictureUploadService} from "../../../service/picture.upload.service";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {Store} from "@ngrx/store";
import * as UserActions from "../../../ngrx-store/actions/user.actions";
import {faCheck, faXmark, faCamera} from "@fortawesome/free-solid-svg-icons";
import {Observable} from "rxjs";
import * as UserSelector from "../../../ngrx-store/selectors/user.selector";

@Component({
  selector: 'upload-picture',
  templateUrl: './upload.picture.component.html',
  styleUrls: ['./upload.picture.component.css']
})
export class UploadPictureComponent{

  faCheck = faCheck;
  faXmark = faXmark;
  faCamera = faCamera;

  @Output() closeWindowEvent = new EventEmitter<void>;
  selectedImage?: File;
  preview: string = "";
  responseMessage$: Observable<string>;

  constructor(private pictureUploadService: PictureUploadService, private store: Store<AppStateInterface>) {
    this.responseMessage$ = this.store.select(UserSelector.selectResponseMessage)
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
        this.store.dispatch(UserActions.changeResponseMessage({responseMessage: ""}))
        this.closeWindowEvent.emit();

      }, 2000)
    }
  }


  closeWindowOutsideClick($event: MouseEvent) {
    if ($event.target == $event.currentTarget) {
      this.closeWindowEvent.emit();
    }
  }

}
