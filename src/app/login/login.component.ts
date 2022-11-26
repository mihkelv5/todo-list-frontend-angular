import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {User} from "../model/user";
import {Subscription} from "rxjs";

import {HttpResponse} from "@angular/common/http";
import {HeaderType} from "../enum/header-type.enum";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faLock, faArrowRightLong} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  faArrowRight = faArrowRightLong;
  faEnvelope = faEnvelope;
  faLock = faLock;
  showInvalidUserDetails = false;
  showLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }


  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigateByUrl("/tasks");
    } else {
      this.router.navigateByUrl("/login"); // just to be safe
    }
  }

  onLogin(user: User) {

    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          if (token != null && response.body) {
            this.showInvalidUserDetails = false;
            this.authenticationService.saveToken(token);
            this.authenticationService.addUserToLocalCache(response.body);
            this.router.navigateByUrl("/tasks");
            this.showLoading = false;
          }
        }, (error: any) => {
          this.showLoading = false;
          this.showInvalidUserDetails = true;
        }
      )
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
