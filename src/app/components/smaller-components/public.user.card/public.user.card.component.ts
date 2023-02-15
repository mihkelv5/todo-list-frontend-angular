import { Component } from '@angular/core';

import {faCheckCircle, faUserTie} from "@fortawesome/free-solid-svg-icons";



@Component({
  selector: 'public-user-card',
  templateUrl: './public.user.card.component.html',
  styleUrls: ['./public.user.card.component.css']
})
export class PublicUserCardComponent {

  faCheckCircle = faCheckCircle;
  faUserTie = faUserTie;

}
