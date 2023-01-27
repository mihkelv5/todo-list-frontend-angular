import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskModel} from "../../../model/task.model";
import {Observable, of} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
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

  @Input("event") event!: EventModel | null;
  tasks$: Observable<TaskModel[]>


  constructor(private router: Router, private store: Store<AppStateInterface>) {
      this.tasks$ = of([])
    }

  ngOnInit(): void {

    if(this.event){
      this.tasks$ = this.store.pipe(select(TasksSelectors.getTasksSelector(this.event.id)))
    } else {
      this.tasks$ = this.store.pipe(select(TasksSelectors.getTasksSelector(null)));
    }
  }

  ngOnDestroy(): void {
  }



}
