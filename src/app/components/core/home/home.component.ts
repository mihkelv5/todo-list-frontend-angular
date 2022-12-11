import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {TaskFilterEnum} from "../../../enum/task-filter.enum";
import {UserTasksComponent} from "../../shared/user-tasks/user-tasks.component";
import {Router} from "@angular/router";
import {EventModel} from "../../../model/event.model";
import {EventService} from "../../../service/event.service";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../service/authentication.service";
import {faImage} from "@fortawesome/free-regular-svg-icons";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, OnDestroy {

  faImage=faImage;
  @ViewChild(UserTasksComponent) tasksComponent!: UserTasksComponent;
  faPlus = faPlus;
  eventList = ["event1", "secondevent", "event3", "this is the fourth one"]
  events: EventModel[] = [];
  activeEvent = 0;
  private username = "";

  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthenticationService, private eventService: EventService, private router: Router) {
    const tempEvent = new EventModel(0, "", "")
    this.events.push(tempEvent); //if events array is empty on load it will give an error while it is loading items from database.
  }


  ngOnInit(): void {
    const user = this.authService.getUserFromLocalCache();
    this.username = user.username;
    this.loadEvents();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.events = [];
    this.username = "";
  }

  private loadEvents() {
    this.subscriptions.push(
      this.eventService.findEventsByUsername(this.username).subscribe(response => {
        this.events = response;
      })
    )
  }

  clickedOnEvent(eventId: number) {
    this.router.navigateByUrl("/event/" + eventId); //TODO: add guard that checks if event exists.
  }

  prev() {
    this.activeEvent -= 1;

    if(this.activeEvent < 0){
      this.activeEvent = this.events.length - 1
    }


  }

  next() {
    this.activeEvent += 1;
    if(this.activeEvent == this.events.length){
      this.activeEvent = 0;
    }

  }

  filterTasks(selectedTask: TaskFilterEnum){
    this.tasksComponent.loadTasksWithFilter(selectedTask);
  }


  createNewTask() {
    this.tasksComponent.createNewTask();
  }

  createNewEvent() {
      this.router.navigateByUrl("/event/edit/new")
  }
}
