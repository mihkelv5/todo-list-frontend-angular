import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./service/authentication.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'toDoList';


  constructor(private authService: AuthenticationService, private titleService:Title)  {
    this.titleService.setTitle(this.title);
    this.authService.loadData();

  }





}
