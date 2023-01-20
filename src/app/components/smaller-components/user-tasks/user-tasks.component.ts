import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskModel} from "../../../model/task.model";
import {Observable, of, Subscription} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {TaskFilterEnum} from "../../../enum/task-filter.enum";
import {Router} from "@angular/router";
import {EventModel} from "../../../model/event.model";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {select, Store} from "@ngrx/store";
import * as TasksSelectors from "../../../ngrx-store/selectors/userTasks.selector"
import * as EventsSelectors from "../../../ngrx-store/selectors/events.selector"


@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit, OnDestroy {
  faPlus = faPlus;

  @Input("event") event!: EventModel | null;

  tasksViewFilter !: TaskFilterEnum;
  viewTaskComponentOpen = false; //enables or disables task create/edit component
  username = "";
  tasks$: Observable<TaskModel[]>
  events$: Observable<EventModel[]>

  constructor(private router: Router, private store: Store<AppStateInterface>) {
      this.tasks$ = of([])
      this.events$ = this.store.pipe(select(EventsSelectors.getEventsSelector))
  }

  ngOnInit(): void {
    console.log(this.event)
    if(this.event){
      this.tasks$ = this.store.pipe(select(TasksSelectors.getEventTasksSelector))
    } else {
      this.tasks$ = this.store.pipe(select(TasksSelectors.getUserTasksSelector));
    }
  }

  ngOnDestroy(): void {
  }



  createNewTask() {
    this.router.navigateByUrl("/task/new/nan/nan")
  }
}
