import { Component } from '@angular/core';
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";


@Component({
  selector: 'app-user.page',
  templateUrl: './user.page.component.html',
  styleUrls: ['./user.page.component.css']
})
export class UserPageComponent {
  faPenToSquare = faPenToSquare;
}
