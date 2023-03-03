import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {faCheckCircle, faPencil} from "@fortawesome/free-solid-svg-icons";
import {PrivateUserModel} from "../../../model/user/privateUser.model";
import {PublicUserModel} from "../../../model/user/publicUser.model";
import {PictureUploadService} from "../../../service/picture.upload.service";
import {FormControl} from "@angular/forms";
import {isUserLoggedIn} from "../../../ngrx-store/selectors/user.selector";




@Component({
  selector: 'public-user-card',
  templateUrl: './public.user.card.component.html',
  styleUrls: ['./public.user.card.component.css']
})
export class PublicUserCardComponent implements OnInit{

  @Input("publicUserModel") publicUserModel!: PublicUserModel;
  @Input("isProfilePage") isProfilePage = false;

  isUserLoggedIn: boolean = false;
  userActivityMessage: string = "";

  isEditPictureViewOpen = false;
  faCheckCircle = faCheckCircle;
  faPencil = faPencil;


  constructor() {
  }

  ngOnInit(): void {
    const activeDateTime = new Date(this.publicUserModel.lastActiveDate).getTime();
    const currentDateTime = new Date().getTime()
    const timeDifference = currentDateTime - activeDateTime;
    if(timeDifference < 1000 * 60 * 15) { //15 minutes
      this.isUserLoggedIn = true;
      this.userActivityMessage = "Online";
    } else if (timeDifference < 1000 * 3600){ //1 hour
      this.isUserLoggedIn = false;
      this.userActivityMessage = "Last active: " + Math.floor((timeDifference / (1000 * 60))) + " minutes ago";
    }
     else if (timeDifference < 1000 * 3600 * 24) { // 24 hours
      this.isUserLoggedIn = false;
      this.userActivityMessage = "Last active: " + Math.floor((timeDifference / (1000 * 3600))) + " hours ago";
    } else {
      this.isUserLoggedIn = false;
      this.userActivityMessage = "Last active: " + Math.floor((timeDifference / (1000 * 3600 * 24))) + " days ago";
    }


  }




  toggleEditPictureWindow(boolean: boolean) {
    this.isEditPictureViewOpen = boolean;
  }
}
