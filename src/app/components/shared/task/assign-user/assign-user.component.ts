import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faXmark} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'assign-user-component',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.css']
})


export class AssignUserComponent implements OnInit{
  @Input("usernames") eventUsernames?: string[];
  @Input("assignedUsernames") assignedUsernames?: string[]; //usernames that are assigned before changes
  canBeAssigned: string[] = [];
  assignedUsers: string [] = []; //usernames that are assigned after changes

  @Output("assignUsers") closeAssignWindow: EventEmitter<string[]>
    = new EventEmitter<string[]>();

  faXmark = faXmark;

  closeWindow(sendData: boolean) {
    const startingArray = JSON.stringify(this.assignedUsernames);
    const finalArray = JSON.stringify(this.assignedUsers);

    setTimeout(() => {
      if(sendData && startingArray != finalArray){
        this.closeAssignWindow.emit(this.assignedUsers);
      }
      else {
        this.closeAssignWindow.emit(undefined);
      }
    }, 100) //so clickOutside directive wouldn't close task info popup

  }

  ngOnInit(): void {
    if(this.eventUsernames && this.assignedUsernames){
      this.canBeAssigned = this.eventUsernames?.filter(username => !this.assignedUsernames?.includes(username));
      this.assignedUsernames.forEach(username => this.assignedUsers.push(username));
    }
  }

  assignUser(selected: string) {
    this.assignedUsers.push(selected)
    this.canBeAssigned = this.canBeAssigned.filter(username => username !== selected);

  }

  removeUser(selected: string) {
    this.canBeAssigned.push(selected);
    this.assignedUsers = this.assignedUsers.filter(username => username !== selected);
  }
}
