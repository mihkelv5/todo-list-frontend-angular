import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {faCheckCircle, faPencil} from "@fortawesome/free-solid-svg-icons";
import {PrivateUserModel} from "../../../model/user/privateUser.model";
import {PublicUserModel} from "../../../model/user/publicUser.model";




@Component({
  selector: 'public-user-card',
  templateUrl: './public.user.card.component.html',
  styleUrls: ['./public.user.card.component.css']
})
export class PublicUserCardComponent{

  @Input("publicUserModel") publicUserModel!: PublicUserModel;
  @Input("isProfilePage") isProfilePage = false;

  isUserOwnProfile: boolean = false;


  faCheckCircle = faCheckCircle;
  faPencil = faPencil;


  constructor() {
  }



}
