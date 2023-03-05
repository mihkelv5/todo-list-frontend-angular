import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";
import {NavigationEnd, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {faMagnifyingGlass, faGear, faArrowRightFromBracket, faUsers, faHouse} from "@fortawesome/free-solid-svg-icons";
import {faUser, faBell} from "@fortawesome/free-regular-svg-icons";
import {InviteService} from "../../../service/invite.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {EventInvitationModel} from "../../../model/eventInvitation.model";
import {CookieService} from "ngx-cookie-service";
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import * as UserSelector from "../../../ngrx-store/selectors/user.selector"
import * as UserActions from "../../../ngrx-store/actions/user.actions";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  faUser = faUser;
  faMagnifyingGlass = faMagnifyingGlass;
  faSettings = faGear;
  faLogout = faArrowRightFromBracket;
  faFriends = faUsers;
  faHome = faHouse;
  faBell = faBell;

  navbarVisible$: Observable<boolean>;
  invites$: Observable<EventInvitationModel[]>


  userMenuVisible = false;
  notificationMenuVisible = false;


  searchValue = "";
  searchForm: FormGroup = new FormGroup({
    search: new FormControl("")
  });

  constructor(private authService: AuthenticationService, private router: Router, private store: Store<AppStateInterface>) {
    this.navbarVisible$ = this.store.select(UserSelector.isUserLoggedIn);
    this.invites$ = this.store.select(UserSelector.getUserInvites);
  }

  logout(){

    this.closeUserAndNotificationMenu();
    this.store.dispatch(UserActions.logout())
    this.router.navigate(["/login"]);
  }

  searchTasks() {
    console.log(this.searchForm.get("search")?.value);
    this.searchForm.setValue({"search" : ""})
  }

  @HostListener('document:keydown.escape', ['$event']) //needs to be moved to special directive
  closeUserAndNotificationMenu(){
    this.userMenuVisible = false;
    this.notificationMenuVisible = false;
  }

  toggleUserDropdownMenu() {
    if(this.notificationMenuVisible){
      this.notificationMenuVisible = false;
    }
    this.userMenuVisible = !this.userMenuVisible;
  }

  toggleNotificationDropdownMenu() {
    if(this.userMenuVisible){
      this.userMenuVisible = false;
    }
    this.notificationMenuVisible = !this.notificationMenuVisible;
  }


    openSettings() {
      this.closeUserAndNotificationMenu();
      this.router.navigateByUrl("/profile/private")
    }
}
