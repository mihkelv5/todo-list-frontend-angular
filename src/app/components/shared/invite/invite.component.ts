import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventInvitationModel} from "../../../model/eventInvitation.model";
import {faUser} from "@fortawesome/free-regular-svg-icons";
@Component({
  selector: 'invite-component',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent {

  faUser = faUser;


  @Input() invite!: EventInvitationModel;
  @Output() responseEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();


  respondToEvent(accepted: boolean) {
    this.responseEmitter.emit(accepted);
  }
}
