import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {TaskFilterEnum} from "../../../enum/task-filter.enum";
import {UserTasksComponent} from "../../smaller-components/user-tasks/user-tasks.component";
import {Router} from "@angular/router";
import {EventModel} from "../../../model/event.model";
import {EventService} from "../../../service/event.service";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../service/authentication.service";
import {faImage} from "@fortawesome/free-regular-svg-icons";
import {Store} from "@ngrx/store";
import * as TasksActions from "../../../ngrx-store/actions/tasksActions";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, OnDestroy {

  faImage=faImage;
  @ViewChild(UserTasksComponent) tasksComponent!: UserTasksComponent;
  faPlus = faPlus;
  events: EventModel[] = [];
  activeEvent = 0;
  private username = "";

  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthenticationService, private eventService: EventService, private router: Router, private store: Store) {}


  ngOnInit(): void {
    const user = this.authService.getUserFromLocalCache();
    this.username = user.username;
    this.loadEvents();
    this.store.dispatch(TasksActions.getUserTasks())
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.events = [];
    this.username = "";
  }

  private loadEvents() {
    this.subscriptions.push(
      this.eventService.findEventsByUser().subscribe(response => {
        this.events = response;
      })
    )
  }

  clickedOnEvent(eventId: string) {
    this.router.navigateByUrl("/event/" + eventId); //TODO: add guard that checks if event exists.
  }

  prev() {
    this.activeEvent -= 1;
    if(this.activeEvent < 0){
      this.activeEvent = this.events.length - 1
    }
    this.filterTasks(4, this.events[this.activeEvent].id);
  }

  next() {
    this.activeEvent += 1;
    if(this.activeEvent == this.events.length){
      this.activeEvent = 0;
    }
    this.filterTasks(4, this.events[this.activeEvent].id);
  }

  filterTasks(selectedTask: TaskFilterEnum, eventId?: string){
    //this.tasksComponent.loadTasksWithFilter(selectedTask, eventId);
  }


  createNewTask() {
    this.tasksComponent.createNewTask();
  }

  createNewEvent() {
      this.router.navigateByUrl("/event/edit/new")
  }
}
