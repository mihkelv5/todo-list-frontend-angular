
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InviteService} from "../../../service/invite.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith, Subscription} from "rxjs";
import {faXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {EventModel} from "../../../model/event.model";
import {PublicUserModel} from "../../../model/user/publicUser.model";
import {UserModel} from "../../../model/user/user.model";
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import * as EventsActions from "../../../ngrx-store/actions/events.actions";

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
    results: PublicUserModel[] = [];
    filteredResults$!: Observable<PublicUserModel[]>;
    subscriptions: Subscription[] = [];
    inviteWaitingListUsers: PublicUserModel[] = [];

    searchValue = "";
    canClose = false;

    @Input("event") event!: EventModel;
    @Output() closeWindowEvent = new EventEmitter<void>;
    @Output() inviteUsers = new EventEmitter<PublicUserModel[]>;

    constructor(private invitationService: InviteService, private store: Store<AppStateInterface>) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.canClose = true;
        }, 300)
        this.loadUsersFromDB()
    }

    loadUsersFromDB() {
        this.subscriptions.push(
            this.invitationService.findUsersToInvite(this.event.id).subscribe(response => {
                this.results = response;
                this.searchControl.setValue("");
            }))

        this.filteredResults$ = this.searchControl.valueChanges.pipe(
            startWith(''),
            map(value =>
                this.filterResults(value)
            ));
    }

    filterResults(value: string): PublicUserModel[] {
        this.searchValue = value;
        return this.results.filter(result =>
            result.username.toLowerCase().includes(value.toLowerCase())
        );
    }


    addToEvent(result: PublicUserModel) {
        this.inviteWaitingListUsers.push(result);
        this.results = this.results.filter(name => name.username !== result.username);

        //doesn't actually change the value in search bar, but forces the filteredResult to update
        this.searchControl.setValue(this.searchValue);
    }

    removeFromInviteList(user: PublicUserModel) {
        this.results.push(user);
        this.inviteWaitingListUsers = this.inviteWaitingListUsers.filter(name => name.username !== user.username);
        //doesn't actually change the value in search bar, but forces the filteredResult to update
        this.searchControl.setValue(this.searchValue);
    }

    unInviteFromEvent(user: PublicUserModel){
        this.store.dispatch(EventsActions.removeAlreadyInvitedUser({eventId: this.event.id, invitedUsername: user.username}))
        this.results.push(user);
        this.searchControl.setValue(this.searchValue);
    }

    closeWindow() {
        if (this.canClose) {
            this.closeWindowEvent.emit();
        }
    }

    closeWindowOutsideClick($event: MouseEvent) {
        if ($event.target == $event.currentTarget) {
            this.closeWindow();
        }
    }


    sendUserInvites() {
        const invitedUsers = this.inviteWaitingListUsers.map(user => user.username)
        this.store.dispatch(EventsActions.inviteUsersToEvent({eventId: this.event.id, invitedUsers}))
        this.inviteWaitingListUsers = [];
    }
}
