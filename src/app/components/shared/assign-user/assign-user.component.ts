import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {PublicUserModel} from "../../../model/user/publicUser.model";
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {EventModel} from "../../../model/event.model";
import {Observable} from "rxjs";

import * as TasksActions from "../../../ngrx-store/actions/task.actions";
import * as EventSelectors from "../../../ngrx-store/selectors/event.selector"

@Component({
  selector: 'assign-user-component',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.css']
})


export class AssignUserComponent implements OnInit{
  @Input("taskId") taskId !: string | null;
  @Input("previouslyAssigned") previouslyAssigned !: PublicUserModel[];
  @Input("currentEvent") currentEvent: EventModel | null = null;

  assignedUsers: PublicUserModel[] = [];
  availableUsers: PublicUserModel[] = [];

  @Output("closeWindow") closeWindowEmitter: EventEmitter<boolean> = new EventEmitter()

  faXmark = faXmark;

  publicUser: PublicUserModel | null = null; // used for showing the info card when hovering username in invite list.
  styles = {left : "-30px", top : "-20px"};

  constructor(private store: Store<AppStateInterface>) {


  }

  ngOnInit(): void {
    this.assignedUsers = this.assignedUsers.concat(this.previouslyAssigned);

    if(this.currentEvent){
      this.availableUsers = this.currentEvent.eventUsers.filter(user => !this.assignedUsers.find(assignedUser => assignedUser.username === user.username));
    }
  }

  closeWindow() {
        this.closeWindowEmitter.emit(false)

  }

  assignUser(selected: PublicUserModel) {
        if(!this.assignedUsers.find(user => user.username == selected.username)){
          this.assignedUsers.push(selected);
        }
        this.availableUsers = this.availableUsers.filter(user => user.username != selected.username);
    this.publicUser = null;
  }

  removeUser(selected: PublicUserModel) {
        console.log(selected.username)
        this.assignedUsers = this.assignedUsers.filter(user => user.username != selected.username)
        this.availableUsers.push(selected);
        this.publicUser = null;
  }

  confirmAssign(users: PublicUserModel[], eventId: string) {
        if(this.taskId){
            this.store.dispatch(TasksActions.saveTaskUsers({taskId: this.taskId, assignedUsers: users, eventId: eventId}))
        }
        this.closeWindowEmitter.emit(true);
  }

  openUserData(user: PublicUserModel | null, event: MouseEvent) {

    this.publicUser = user;
  }
}
