import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../service/authentication.service";
import {UserModel} from "../../../model/user.model";
import {Subscription} from "rxjs";

import {HttpResponse} from "@angular/common/http";
import {HeaderType} from "../../../enum/header-type.enum";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faLock, faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {CookieService} from "ngx-cookie-service";


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
  showLoading = false;
  loginErrorMessage = ""
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService, private cookieService: CookieService) {

  }


  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigateByUrl("/home");
    }
  }

  onLogin(user: UserModel) {
    this.showLoading = true;


    /*first gets refresh token, then if successful
    gets access token with refresh token.

    */
    this.subscriptions.push(
      this.authenticationService.getRefreshToken(user).subscribe(
        (response: HttpResponse<string>) => {
              const username = response.headers.get("username")
              console.log(username)
              if(username){
                this.setCookie(username)
                this.authenticationService.getAccessToken(user.username).subscribe(
                (response2: HttpResponse<UserModel>) => {
                        const accessToken = response2.headers.get(HeaderType.JWT_TOKEN);
                        if (accessToken != null && response2.body) {
                          this.loginErrorMessage = "";
                          this.authenticationService.saveToken(accessToken);
                          this.authenticationService.addUserToLocalCache(response2.body);
                          this.router.navigateByUrl("/home");
                          this.showLoading = false;
                        }});
              }
        }, (error: any) => {
          if(error.status == "403"){
            this.loginErrorMessage = "Invalid username or password";
          } else {
            this.loginErrorMessage = "Something went wrong, please try again"
          }
          this.showLoading = false;
        }
      )
    )
  }

  setCookie(username: string) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7)
    this.cookieService.set(
      "Login-Cookie",
      username,
      expiryDate,
      "",
      "",
      false,
      "Lax"
      )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
