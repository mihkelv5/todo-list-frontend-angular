import {Component, OnDestroy} from '@angular/core';
import {Location} from "@angular/common";
import {UserModel} from "../../../model/user/user.model";
import {faEnvelope, faUser} from "@fortawesome/free-solid-svg-icons";
import {faLock, faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../service/authentication.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy{

  faUser = faUser;
  faArrowLeft = faArrowLeftLong;
  faEnvelope = faEnvelope;
  faLock = faLock;
  registerMessage = ""
  registerErrorMessage = "";
  showLoading = false;

  private subscriptions: Subscription[] = [];

  registerForm: FormGroup;



  constructor(private location: Location, private router: Router,
              private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      usernameInput: new FormControl('', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])),
      emailInput: new FormControl('', Validators.compose([Validators.minLength(6), Validators.maxLength(30), Validators.required, Validators.email])),
      passwordInput: new FormControl('', Validators.compose([Validators.minLength(4), Validators.maxLength(30), Validators.required])),
      passwordAgainInput: new FormControl('', Validators.required),
    },
      {
        validators: this.mustMatch("passwordInput", "passwordAgainInput")
      })
  }

  //confirms passwords in form
  mustMatch(password: any, confirmPassword: any){
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if(confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }
      if(passwordControl.value !== confirmPasswordControl.value){
        confirmPasswordControl.setErrors({mustMatch:true});
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  //used for html to show error messages when needed
  get usernameInput(){
    return this.registerForm.get('usernameInput');
  }
  get emailInput(){
    return this.registerForm.get('emailInput');
  }
  get passwordInput(){
    return this.registerForm.get('passwordInput')
  }
  get passwordAgainInput(){
    return this.registerForm.get('passwordAgainInput')
  }

  returnToLastPage() {
    this.location.back();
  }

  register() {
    const username = this.registerForm.get("usernameInput");
    const email = this.registerForm.get("emailInput");
    const password = this.registerForm.get("passwordInput");

    if(username && email && password){

      const user = new UserModel(
        "",
        username.value,
        email.value,
        password.value,
        false,
        "ROLE_USER"
      )
      console.log(user)
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



    /*this.registerErrorMessage = "";
    user.enabled = false; //TODO: add email confirmation to backend
    user.roles = "ROLE_USER";
    user.email = Date.now().toString() + "@mail.ee";
    */
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
