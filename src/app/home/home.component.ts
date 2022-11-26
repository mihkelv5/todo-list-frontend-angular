import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {TaskViewComponent} from "../taskView/task-view.component";
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {


  @(ViewChild("app-task-view"))
  taskView!: TaskViewComponent;

  constructor(private authService: AuthenticationService, private router: Router) {}


  ngOnInit(): void {

  }



  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  isLoggedIn(){
    return this.authService.isUserLoggedIn();
  }
}
