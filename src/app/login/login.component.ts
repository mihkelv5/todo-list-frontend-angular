import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {NotificationService} from "../service/notification.service";
import {User} from "../model/user";
import {Subscription} from "rxjs";

import {HttpResponse} from "@angular/common/http";
import {NotificationType} from "../enum/notification-type.enum";
import {HeaderType} from "../enum/header-type.enum";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {faLock} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  faEnvelope = faEnvelope;
  faLock = faLock;
  showInvalidUserDetails = false;
  showLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
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
