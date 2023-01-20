import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../../service/task.service";
import {TaskModel} from "../../../model/task.model";
import {Observable, of, Subscription} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../../service/authentication.service";
import {TaskFilterEnum} from "../../../enum/task-filter.enum";
import {Router} from "@angular/router";
import {EventModel} from "../../../model/event.model";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {select, Store} from "@ngrx/store";
import * as TasksSelectors from "../../../ngrx-store/selectors/tasks.selector"


@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit, OnDestroy {
  faPlus = faPlus;

  @Input("event") event?: EventModel;

  tasksViewFilter !: TaskFilterEnum;
  viewTaskComponentOpen = false; //enables or disables task create/edit component
  username = "";
  tasks$: Observable<TaskModel[]>

  constructor(private router: Router, private store: Store<AppStateInterface>) {
      this.tasks$ = this.store.pipe(select(TasksSelectors.getUserTasksSelector));


  }

  ngOnInit(): void {
    if(this.event){

    }
  }

  ngOnDestroy(): void {
  }



  createNewTask() {
    this.router.navigateByUrl("/task/new/nan/nan")
  }
}
