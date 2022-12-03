import {Component, OnDestroy} from '@angular/core';
import {Location} from "@angular/common";
import {User} from "../../../model/user";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faLock, faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy{

  faArrowLeft = faArrowLeftLong;
  faEnvelope = faEnvelope;
  faLock = faLock;
  registerMessage = ""
  registerErrorMessage = "";
  showLoading = false;

  private subscriptions: Subscription[] = [];


  constructor(private location: Location, private router: Router, private authenticationService: AuthenticationService) {
  }

  returnToLastPage() {
    this.location.back();
  }

  register(user: User) {
    this.registerErrorMessage = "";
    user.enabled = true; //TODO: add email confirmation to backend
    user.roles = "ROLE_USER"
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
          () => {
            this.registerMessage = "Account successfully created"

            setTimeout(() => {
              this.registerMessage = "";
              this.router.navigateByUrl("/login")
            }, 1000);


          }, (error) => {
            this.showLoading = false;
            if(error.status == 422){
              this.registerErrorMessage = "Username already taken";
            } else {
              this.registerErrorMessage = "Something went wrong, please try again";
            }
          }));
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
