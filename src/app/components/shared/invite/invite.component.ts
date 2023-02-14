import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventInvitationModel} from "../../../model/eventInvitation.model";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {Store} from "@ngrx/store";
import * as UserActions from "../../../ngrx-store/actions/user.actions";
import {Location} from "@angular/common";
@Component({
  selector: 'invite-component',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent {


  faUser = faUser;

  @Input() invite!: EventInvitationModel;

  constructor(private store: Store<AppStateInterface>) {
  }

  respondToEvent(accepted: boolean) {
    this.store.dispatch(UserActions.respondToInvite({inviteId: this.invite.id, accepted: accepted}));
  }
}
