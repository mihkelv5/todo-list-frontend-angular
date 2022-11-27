import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faUser = faUser;
  faMagnifyingGlass = faMagnifyingGlass;
  userDropDownMenuVisible = false;
  @ViewChild("dropdownMenu") dropdownMenu!: ElementRef;

  searchValue = "";
  searchForm: FormGroup = new FormGroup({
    search: new FormControl("")
  });

  constructor(private authService: AuthenticationService, private router: Router) {

  }


  ngOnInit(): void {
    console.log(localStorage.getItem("user"));

  }



  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  isLoggedIn(){
    return this.authService.isUserLoggedIn();
  }

  searchTasks() {
    console.log(this.searchForm.get("search")?.value);
    this.searchForm.setValue({"search" : ""})
  }


  toggleUserDropdownMenu() {

    if(!this.userDropDownMenuVisible) {
      this.dropdownMenu.nativeElement.classList.remove("dropdown-menu-hidden")
    } else {
      this.dropdownMenu.nativeElement.classList.add("dropdown-menu-hidden")
    }
    this.userDropDownMenuVisible = !this.userDropDownMenuVisible;
  }
}
