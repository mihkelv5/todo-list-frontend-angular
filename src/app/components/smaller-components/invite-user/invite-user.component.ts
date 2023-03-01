
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InviteService} from "../../../service/invite.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {faXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {EventModel} from "../../../model/event.model";
import {PublicUserModel} from "../../../model/user/publicUser.model";
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import * as EventsActions from "../../../ngrx-store/actions/event.actions";

@Component({
    selector: 'app-invite-users',
    templateUrl: './invite-user.component.html',
    styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit{

    faXmark = faXmark;
    faMagnifyingGlass = faMagnifyingGlass;
    faUser = faUser;


    searchControl = new FormControl();
    filteredResults$!: Observable<PublicUserModel[]>;

    searchValue = "";
    canClose = false;


    publicUser: PublicUserModel | null = null;
    windowXLoc = 0;
    windowYLoc = 0;
    styles = {left : "10px", top : "0"};

    @Input("event") event!: EventModel;
    @Output() closeWindowEvent = new EventEmitter<void>;

    constructor(private store: Store<AppStateInterface>) {

    }

    ngOnInit() {
        setTimeout(() => {
            this.canClose = true;
        }, 300)
        this.loadUsersFromDB()

    }

    loadUsersFromDB() {
        this.searchControl.setValue("");

        this.filteredResults$ = this.searchControl.valueChanges.pipe(
            startWith(''),
            map(value =>
                this.filterResults(value)
            ));
    }

    filterResults(value: string): PublicUserModel[] {
        this.searchValue = value;
        return this.event.canBeInvited.filter(result =>
            result.username.toLowerCase().includes(value.toLowerCase())
        );
    }


    addToEvent(user: PublicUserModel) {

        this.store.dispatch(EventsActions.moveUserToWaitingList({addedUser: user}))
        setTimeout(() => {
            this.searchControl.setValue(this.searchValue);
        }, 0) //forces the invite list to update
    }

    removeFromInviteList(user: PublicUserModel) {
        this.store.dispatch(EventsActions.removeUserFromWaitingList({removedUser: user}))
        setTimeout(() => {
            this.searchControl.setValue(this.searchValue);
        }, 0) //forces the invite list to update

    }

    unInviteFromEvent(user: PublicUserModel){
        this.store.dispatch(EventsActions.removeAlreadyInvitedUser({eventId: this.event.id, invitedUsername: user.username}))
        setTimeout(() => {
            this.searchControl.setValue(this.searchValue);
        }, 50) //forces the invite list to update
    }

    closeWindow() {
        if (this.canClose) {
            this.closeWindowEvent.emit();
            this.store.dispatch(EventsActions.cancelInvite())
        }
    }

    closeWindowOutsideClick($event: MouseEvent) {
        if ($event.target == $event.currentTarget) {
            this.closeWindow();
        }
    }


    sendUserInvites() {
        const invitedUsers = this.event.waitingList.map(user => user.username);
        this.store.dispatch(EventsActions.inviteUsersToEvent({eventId: this.event.id, invitedUsers}))
        this.closeWindow()
    }

    openUserData(user: PublicUserModel | null, event: MouseEvent) {

      this.styles.left = event.clientX + "px";
      this.styles.top = (event.clientY + 20) + "px";

      //

      this.publicUser = user;
    }
}
