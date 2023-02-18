import {Component, OnInit} from '@angular/core';

import {faCheckCircle, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";



@Component({
  selector: 'public-user-card',
  templateUrl: './public.user.card.component.html',
  styleUrls: ['./public.user.card.component.css']
})
export class PublicUserCardComponent {

  isUserOwnProfile: boolean = false;


  faCheckCircle = faCheckCircle;
  faUserTie = faUserTie;



}
