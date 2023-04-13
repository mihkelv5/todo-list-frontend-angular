import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {EventModel} from "../../../model/event.model";
import {EventService} from "../../../service/event.service";
import {Observable, take} from "rxjs";
import {AuthenticationService} from "../../../service/authentication.service";
import {faPlus, faBars, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faImage, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {select, Store} from "@ngrx/store";
import * as TasksActions from "../../../ngrx-store/actions/task.actions";
import * as EventActions from "../../../ngrx-store/actions/event.actions";
import * as UserActions from "../../../ngrx-store/actions/user.actions";
import {PrivateUserModel} from "../../../model/user/privateUser.model";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import * as UserSelector from "../../../ngrx-store/selectors/user.selector";
import * as EventsSelector from "../../../ngrx-store/selectors/event.selector";
import * as TaskSelector from "../../../ngrx-store/selectors/task.selector";
import {DateRange,  DefaultMatCalendarRangeStrategy,  MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    },
  ],
})


export class HomeComponent{


  constructor(private authService: AuthenticationService, private eventService: EventService, private router: Router, private store: Store<AppStateInterface>) {
    this.store.select(TaskSelector.getAreTasksLoaded).pipe(take(1)).subscribe(
        bool => {
            if(!bool){
                this.store.dispatch(TasksActions.getUserTasks());
            }
        })
    this.store.dispatch(EventActions.getCurrentEvent({eventId: ""}));
    this.store.dispatch(EventActions.getAllEvents());

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
