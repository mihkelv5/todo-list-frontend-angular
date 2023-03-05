import {AfterViewInit, Component} from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {EventModel} from "../../../model/event.model";
import {EventService} from "../../../service/event.service";
import {Observable, take} from "rxjs";
import {AuthenticationService} from "../../../service/authentication.service";
import {faImage} from "@fortawesome/free-regular-svg-icons";
import {select, Store} from "@ngrx/store";
import * as TasksActions from "../../../ngrx-store/actions/task.actions";
import * as EventActions from "../../../ngrx-store/actions/event.actions";
import {PrivateUserModel} from "../../../model/user/privateUser.model";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import * as UserSelector from "../../../ngrx-store/selectors/user.selector";
import * as EventsSelector from "../../../ngrx-store/selectors/event.selector";
import * as TaskSelector from "../../../ngrx-store/selectors/task.selector";
import {FormControl, FormGroup} from "@angular/forms";
import {
  DateRange,
  DefaultMatCalendarRangeStrategy,
  MAT_DATE_RANGE_SELECTION_STRATEGY
} from "@angular/material/datepicker";

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


export class HomeComponent implements AfterViewInit{

  faImage=faImage;
  faPlus = faPlus;

  events$: Observable<EventModel[]>
  currentUser$!: Observable<PrivateUserModel>

  selectedDateRange: DateRange<Date>


  constructor(private authService: AuthenticationService, private eventService: EventService, private router: Router, private store: Store<AppStateInterface>) {
    this.store.select(TaskSelector.getAreTasksLoaded).pipe(take(1)).subscribe(
        bool => {
            if(!bool){
                this.store.dispatch(TasksActions.getUserTasks());
            }
        })
    this.store.dispatch(EventActions.getCurrentEvent({eventId: ""}));
    this.store.dispatch(EventActions.getAllEvents());

    this.events$ = this.store.pipe(select(EventsSelector.getEventsSelector));

    this.selectedDateRange = new DateRange<Date>(null, null)
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

  //date selectors

  customDatesSelected(date: Date): void {


    if (this.selectedDateRange && this.selectedDateRange.start && date > this.selectedDateRange.start && !this.selectedDateRange.end) {
      this.selectedDateRange = new DateRange(this.selectedDateRange.start, date);
    } else {
      this.selectedDateRange = new DateRange(date, null);
    }
  }

  buttonDatesSelected(dateCase: number): void {
      switch (dateCase) {
        case 0: { //today
          this.selectedDateRange = new DateRange<Date>(new Date(), null);
          return
        }

        case 1: { //this week
          const date = new Date()
          let dayOfTheWeek = date.getDay();
          if(dayOfTheWeek == 0){
            dayOfTheWeek = 7;
          }
          const weekStart = new Date(date.setDate((date.getDate()) - (dayOfTheWeek)+ 1 ) );
          const weekEnd = new Date(date.setDate(date.getDate() + 6));
          this.selectedDateRange = new DateRange<Date>(weekStart, weekEnd);
          return;
        }

        case 2: { //this month
          const date = new Date();
          const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
          const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          this.selectedDateRange = new DateRange<Date>(firstDay, lastDay);
          return;
        }
        default: {
          this.selectedDateRange = new DateRange<Date>(null, null);
        }
      }
  }

  setOneDate() {
    //if user moves their cursor out of the calendar having selected only one date, the date range will be set for only one day
    if(this.selectedDateRange.start && !this.selectedDateRange.end){
      this.selectedDateRange = new DateRange<Date>(this.selectedDateRange.start, this.selectedDateRange.start);
    }
  }
}
