import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../service/authentication.service";
import {UserModel} from "../../../model/user/user.model";
import { take} from "rxjs";

import {HttpResponse} from "@angular/common/http";
import {HeaderType} from "../../../enum/header-type.enum";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faLock, faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {CookieService} from "ngx-cookie-service";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import { Store} from "@ngrx/store";
import * as UserActions from "../../../ngrx-store/actions/user.actions";
import * as TaskActions from "../../../ngrx-store/actions/task.actions";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  faArrowRight = faArrowRightLong;
  faEnvelope = faEnvelope;
  faLock = faLock;
  showLoading = false;
  loginErrorMessage = ""

  constructor(private router: Router, private authenticationService: AuthenticationService, private cookieService: CookieService, private store: Store<AppStateInterface>) {

  }


  ngOnInit() {
    if(this.cookieService.get("Login-Cookie")){
      this.router.navigateByUrl("/home");
    }
  }

  onLogin(user: UserModel) {
    this.showLoading = true;


    /*first gets refresh token, then if successful
    gets access token with refresh token.
    */

      this.authenticationService.getRefreshToken(user).pipe(take(1)).subscribe(
        (response: HttpResponse<string>) => {
              const username = response.headers.get("username");
              const validDays  = response.headers.get("Valid-Days"); //server sets a header that tells how many days the refresh token is valid
              if(username && validDays && response.body){
                this.setCookie(username, +validDays) //local cookie to check if user is logged in, as browser cant read server side cookies with httponly

                //after receiving refresh token make another call to backend to receive access token.

                  this.authenticationService.getAccessToken(user.username).pipe(take(1)).subscribe(
                    (response2: HttpResponse<string>) => {
                      const accessToken = response2.headers.get(HeaderType.JWT_TOKEN);

                      if (accessToken != null && response2.body) {
                        this.authenticationService.saveToken(accessToken);
                        this.loginErrorMessage = "";
                        this.store.dispatch(UserActions.getUserData())
                        this.store.dispatch(TaskActions.getUserTasks())
                        this.router.navigateByUrl("/home");
                        this.showLoading = false;
                          return;
                        }});
              } else {
                this.loginErrorMessage = "Something went wrong, please try again"
              }
        }, (error: any) => {
          if(error.status == "403"){
            this.loginErrorMessage = "Invalid username or password";
            this.showLoading = false;
            return;
          } else {
            this.loginErrorMessage = "Something went wrong, please try again"
          }

        }
      )

    this.showLoading = false;
  }

  setCookie(username: string, validDays: number) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + validDays)

    this.cookieService.set(
      "Login-Cookie",
      username,
      expiryDate,
      "/",
      "",
      false,
      "Lax"
      )
  }



}
