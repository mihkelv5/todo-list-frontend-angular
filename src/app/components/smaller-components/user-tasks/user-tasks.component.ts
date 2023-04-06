import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TaskModel} from "../../../model/task.model";
import {Observable, of} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {EventModel} from "../../../model/event.model";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {select, Store} from "@ngrx/store";
import * as TasksSelectors from "../../../ngrx-store/selectors/task.selector"
import {DateRange} from "@angular/material/datepicker";


@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit {
  faPlus = faPlus;

  @Input("event") event!: EventModel | null;


  tags$: Observable<string[]>;
  dateRange$: Observable<DateRange<Date>>;
  tasks$: Observable<TaskModel[]>

  hideCompletedTasks = true;


  constructor(private router: Router, private store: Store<AppStateInterface>) {
      this.tasks$ = of([])
    this.tags$ = this.store.select(TasksSelectors.getTaskTags)
    this.dateRange$ = this.store.select(TasksSelectors.getTaskDates)
    }

  ngOnInit(): void {
    if(this.event){
      this.tasks$ = this.store.pipe(select(TasksSelectors.getTasksSelector(this.event.id)))
    } else {
      this.tasks$ = this.store.pipe(select(TasksSelectors.getTasksSelector(null)));
    }
  }

  isVisible(task: TaskModel, dateRange: DateRange<Date>, tags: string[]): boolean {
    const date = new Date(task.date+ ", 00:00.00") //added hours so timezones would not affect filtering.

    if(this.hideCompletedTasks && task.complete) {
      return false;
    }

    if(dateRange.start == null || dateRange.start.getTime() <= date.getTime()) {
      if(dateRange.end == null || dateRange.end.getTime() >= date.getTime()){
        if (tags.length == 0) {
          return true;
        }
        return tags.some(tag => task.tags.includes(tag));
      }
    }
    return false;
  }


  createNewTask() {
    if(this.event){
      this.router.navigateByUrl("/task/new/" + this.event.id + "/" + this.event.title)
    } else {
      this.router.navigateByUrl("/task/new/nan/nan")
    }
  }

  toggleCompletedTasks() {
    this.hideCompletedTasks  = !this.hideCompletedTasks;
  }
}
