import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {PublicUserModel} from "../../../model/user/publicUser.model";
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {EventModel} from "../../../model/event.model";
import {Observable, take} from "rxjs";
import {TaskModel} from "../../../model/task.model";
import * as TasksActions from "../../../ngrx-store/actions/tasks.actions";
import * as TaskSelectors from "../../../ngrx-store/selectors/tasks.selector"
import * as EventSelectors from "../../../ngrx-store/selectors/events.selector"

@Component({
  selector: 'assign-user-component',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.css']
})


export class AssignUserComponent implements OnInit{
  @Input("taskId") taskId !: string | null;
    @Input("previouslyAssigned") previouslyAssigned !: PublicUserModel[];

    currentEvent$: Observable<EventModel | null>
    assignedUsers: PublicUserModel[] = [];

    @Output("closeWindow") closeWindowEmitter: EventEmitter<boolean> = new EventEmitter()

  faXmark = faXmark;


    constructor(private store: Store<AppStateInterface>) {

        this.currentEvent$ = this.store.select(EventSelectors.getCurrentEventSelector)

    }

    ngOnInit(): void {
        this.assignedUsers = this.assignedUsers.concat(this.previouslyAssigned);
  }

  closeWindow() {
        this.closeWindowEmitter.emit(false)

  }

  assignUser(selected: PublicUserModel) {
        if(!this.assignedUsers.find(user => user.username == selected.username)){
          this.assignedUsers.push(selected);
        }
  }

  removeUser(selected: PublicUserModel) {
        console.log(selected.username)
        this.assignedUsers = this.assignedUsers.filter(user => user.username != selected.username)
  }

  confirmAssign(users: PublicUserModel[], eventId: string) {
        if(this.taskId){
            this.store.dispatch(TasksActions.saveTaskUsers({taskId: this.taskId, assignedUsers: users, eventId: eventId}))
        }
        this.closeWindowEmitter.emit(true);
  }
}
