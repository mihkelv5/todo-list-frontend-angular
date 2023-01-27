import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";
import {NavigationEnd, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {faMagnifyingGlass, faGear, faArrowRightFromBracket, faUsers, faHouse} from "@fortawesome/free-solid-svg-icons";
import {faUser, faBell} from "@fortawesome/free-regular-svg-icons";
import {InviteService} from "../../../service/invite.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {EventInvitationModel} from "../../../model/eventInvitation.model";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  faUser = faUser;
  faMagnifyingGlass = faMagnifyingGlass;
  faSettings = faGear;
  faLogout = faArrowRightFromBracket;
  faFriends = faUsers;
  faHome = faHouse;
  faBell = faBell;

  navbarVisible$ = new BehaviorSubject<boolean>(true);
  userMenuVisible = false;
  notificationMenuVisible = false;

  subscriptions: Subscription[] = [];
  invites: EventInvitationModel[] = []
  username: string = "";
  areInvitesLoaded = false;

  searchValue = "";
  searchForm: FormGroup = new FormGroup({
    search: new FormControl("")
  });

  constructor(private authService: AuthenticationService, private router: Router,
              private inviteService: InviteService, private cookieService: CookieService) {
  }


  ngOnInit(): void {
    this.subscribeToRouter()

  }

  //subscribes to router events to decide if navbar should be shown.
  //And loads data if user has

  subscribeToRouter(){
    this.subscriptions.push(
      this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd){
          if(event.urlAfterRedirects.toLowerCase() != "/login"
            && event.urlAfterRedirects.toLowerCase() != "/register"){
            this.navbarVisible$.next(true)

            if(this.cookieService.get("Login-Cookie") && !this.areInvitesLoaded){
              this.loadInvitesFromDB();
              this.areInvitesLoaded = true;
            }
          } else { //user is either on login or register page
            this.navbarVisible$.next(false)
          }
        }
      })
    )
  }

  loadInvitesFromDB(){
    this.subscriptions.push(
      this.inviteService.getUserInvitations().subscribe(response => {
        this.invites = response;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



  logout(){

      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.closeUserAndNotificationMenu();
    this.authService.logout();
    this.invites = [];
    this.areInvitesLoaded = false;
    this.router.navigate(["/login"]);
    this.username = "";

  }


  searchTasks() {
    console.log(this.searchForm.get("search")?.value);
    this.searchForm.setValue({"search" : ""})
  }

  @HostListener('document:keydown.escape', ['$event'])
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

  respondToInvite($event: boolean, invite: EventInvitationModel) {
    if($event){
      this.subscriptions.push(
        this.inviteService.acceptInvite(invite).subscribe(() => {
          this.loadInvitesFromDB();
          this.closeUserAndNotificationMenu();
          this.router.navigateByUrl("/");
        }))
    } else {
      this.subscriptions.push(
        this.inviteService.declineInvite(invite).subscribe(() => {
          this.loadInvitesFromDB();
        }))
    }
  }
}
