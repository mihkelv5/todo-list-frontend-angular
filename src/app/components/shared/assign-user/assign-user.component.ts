import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {PublicUserModel} from "../../../model/user/publicUser.model";


@Component({
  selector: 'assign-user-component',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.css']
})


export class AssignUserComponent implements OnInit{
  @Input("usersInEvent") usersInEvent?: PublicUserModel[];
  @Input("alreadyAssignedUsers") alreadyAssignedUsers?: PublicUserModel[]; //usernames that are assigned before changes
  canBeAssigned: PublicUserModel[] = [];
  assignedUsers: PublicUserModel[] = []; //usernames that are assigned after changes
  canCloseWindow = false; //used so clickedOutside directive wouldn't close window instantly when opened

  @Output("assignUsers") closeAssignWindow: EventEmitter<PublicUserModel[]>
    = new EventEmitter<PublicUserModel[]>();

  faXmark = faXmark;

  ngOnInit(): void {
    setTimeout(() => {
      this.canCloseWindow = true;
    }, 100)
    if(this.usersInEvent && this.alreadyAssignedUsers){
      this.canBeAssigned = this.usersInEvent?.filter(username => !this.alreadyAssignedUsers?.includes(username));
      this.alreadyAssignedUsers.forEach(username => this.assignedUsers.push(username));
    }
  }

  closeWindow(sendData: boolean) {
    if(this.canCloseWindow){
      const startingArray = JSON.stringify(this.alreadyAssignedUsers);
      const finalArray = JSON.stringify(this.assignedUsers);


      if(sendData && startingArray != finalArray){
        this.closeAssignWindow.emit(this.assignedUsers);
      }
      else {
        this.closeAssignWindow.emit(undefined);
      }
    }
  }

  assignUser(selected: PublicUserModel) {
    this.canCloseWindow = false; //workaround for (clickedOutside) directive, so it wouldn't close window when assigning users
    setTimeout(() => {
      this.canCloseWindow = true;
    }, 100)

    this.assignedUsers.push(selected)
    this.canBeAssigned = this.canBeAssigned.filter(username => username !== selected);

  }

  removeUser(selected: PublicUserModel) {
    this.canCloseWindow = false; //workaround for (clickedOutside) directive, so it wouldn't close window when assigning users
    setTimeout(() => {
      this.canCloseWindow = true;
    }, 100)

    this.canBeAssigned.push(selected);
    this.assignedUsers = this.assignedUsers.filter(username => username !== selected);
  }
}
