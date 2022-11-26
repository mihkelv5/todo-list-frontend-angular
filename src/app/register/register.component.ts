import { Component } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private location: Location) {
  }

  returnToLastPage() {
    this.location.back();
  }
}
