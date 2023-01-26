import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {TaskFilterEnum} from "../../../enum/task-filter.enum";
import {UserTasksComponent} from "../../smaller-components/user-tasks/user-tasks.component";
import {Router} from "@angular/router";
import {EventModel} from "../../../model/event.model";
import {EventService} from "../../../service/event.service";
import {Observable, of, Subscription, take} from "rxjs";
import {AuthenticationService} from "../../../service/authentication.service";
import {faImage} from "@fortawesome/free-regular-svg-icons";
import {select, Store} from "@ngrx/store";
import * as TasksActions from "../../../ngrx-store/actions/tasks.actions";
import * as EventActions from "../../../ngrx-store/actions/events.actions";
import {PrivateUserModel} from "../../../model/user/privateUser.model";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import * as UserSelector from "../../../ngrx-store/selectors/userData.selector";
import * as EventsSelector from "../../../ngrx-store/selectors/events.selector";
import * as TaskSelector from "../../../ngrx-store/selectors/tasks.selector";
import * as UsersActions from "../../../ngrx-store/actions/users.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements AfterViewInit{

    faImage=faImage;
    faPlus = faPlus;
    events$: Observable<EventModel[]>
    currentUser$!: Observable<PrivateUserModel>



  constructor(private authService: AuthenticationService, private eventService: EventService, private router: Router, private store: Store<AppStateInterface>) {
    this.store.select(TaskSelector.getAreTasksLoaded).pipe(take(1)).subscribe(
        bool => {
            if(!bool){
                this.store.dispatch(TasksActions.getUserTasks());
            }
        }

    )



    this.store.dispatch(EventActions.getCurrentEvent({eventId: ""}));
    this.store.dispatch(EventActions.getAllEvents());


    this.events$ = this.store.pipe(select(EventsSelector.getEventsSelector));
  }

  ngAfterViewInit() {
      this.currentUser$ = this.store.pipe(select(UserSelector.getUserDataSelector));
  }

    clickedOnEvent(eventId: string) {
    this.router.navigateByUrl("/event/" + eventId); //TODO: add guard that checks if event exists.
  }


  createNewTask() {
      this.router.navigateByUrl("/task/new/nan/nan")
  }

  createNewEvent() {
      this.router.navigateByUrl("/event/edit/new")
  }

}
