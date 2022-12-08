import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InviteService} from "../../../service/invite.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith, Subscription} from "rxjs";
import {faXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";


@Component({
  selector: 'app-invite-users',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent {

  faXmark = faXmark;
  faMagnifyingGlass = faMagnifyingGlass;
  faUser = faUser;


  searchControl = new FormControl();
  results: string[] = [];
  filteredResults$!: Observable<string[]>;
  subscriptions: Subscription[] = [];
  invitedUsers: string[] = [];

  searchValue = "";
  canClose = false;

  @Input("eventId") eventId !: number;
  @Output() closeWindowEvent = new EventEmitter<void>;
  @Output() inviteUsers = new EventEmitter<string[]>;

  constructor(private invitationService: InviteService) {}

  ngOnInit() {
    setTimeout(() => {
      this.canClose = true;
    }, 300)
    this.loadUsersFromDB()
  }

  loadUsersFromDB() {
    this.subscriptions.push(
      this.invitationService.findUsernamesToInvite(this.eventId).subscribe(response => {
        this.results = response;
        this.searchControl.setValue("");
      }))

    this.filteredResults$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value =>
        this.filterResults(value)
      ));
  }

  filterResults(value: string): string[] {
    this.searchValue = value;
    return this.results.filter(result =>
      result.toLowerCase().includes(value.toLowerCase())
    );
  }


  addToEvent(result: string) {
    this.invitedUsers.push(result);
    this.results = this.results.filter(name => name !== result);

    //doesn't actually change the value in search bar, but forces the filteredResult to update
    this.searchControl.setValue(this.searchValue);
  }

  removeFromEvent(username: string) {
    this.results.push(username);
    this.invitedUsers = this.invitedUsers.filter(name => name !== username);

    //doesn't actually change the value in search bar, but forces the filteredResult to update
    this.searchControl.setValue(this.searchValue);
  }

  closeWindow(){
    if(this.canClose){
      this.closeWindowEvent.emit();
    }
  }

  closeWindowOutsideClick($event: MouseEvent) {
    if($event.target == $event.currentTarget){
      this.closeWindow();
    }
  }

  sendUserInvites(){
    this.inviteUsers.emit(this.invitedUsers);
  }
}
