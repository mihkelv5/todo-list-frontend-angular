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
import {FormControl, FormGroup} from "@angular/forms";
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

  faImage=faImage;
  faPlus = faPlus;
  faTrashCan = faTrashCan;
  faBars = faBars;
  faAngleLeft = faAngleLeft;

  groups$: Observable<EventModel[]>
  currentUser$!: Observable<PrivateUserModel>

  selectedDateRange: DateRange<Date>
  activeTags: string[] = [];
  creatingNewTag: boolean = false;

  isSideBarVisible = true;

  constructor(private authService: AuthenticationService, private eventService: EventService, private router: Router, private store: Store<AppStateInterface>) {
    this.store.select(TaskSelector.getAreTasksLoaded).pipe(take(1)).subscribe(
        bool => {
            if(!bool){
                this.store.dispatch(TasksActions.getUserTasks());
            }
        })
    this.store.dispatch(EventActions.getCurrentEvent({eventId: ""}));
    this.store.dispatch(EventActions.getAllEvents());
    this.currentUser$ = this.store.pipe(select(UserSelector.getUserDataSelector));
    this.groups$ = this.store.pipe(select(EventsSelector.getEventsSelector));

    this.selectedDateRange = new DateRange<Date>(null, null);
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
      this.store.dispatch(TasksActions.filterTaskDates({dateRange: this.selectedDateRange}))
    } else {
      this.selectedDateRange = new DateRange(date, null);
      this.store.dispatch(TasksActions.filterTaskDates({dateRange: new DateRange<Date>(date, date)}))
      //user has possibility to select 2nd date, but tasks only on currently selected date are shown in case user does not select second date
    }
  }

  buttonDatesSelected(dateCase: number): void {
      switch (dateCase) {
        case 0: { //today
          const today = new Date();
          this.selectedDateRange = new DateRange<Date>(today, today);
          this.store.dispatch(TasksActions.filterTaskDates({dateRange: this.selectedDateRange}))
          return;
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
          this.store.dispatch(TasksActions.filterTaskDates({dateRange: this.selectedDateRange}))
          return;
        }

        case 2: { //this month
          const date = new Date();
          const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
          const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          this.selectedDateRange = new DateRange<Date>(firstDay, lastDay);
          this.store.dispatch(TasksActions.filterTaskDates({dateRange: this.selectedDateRange}))
          return;
        }
        default: {
          this.selectedDateRange = new DateRange<Date>(null, null);
          this.store.dispatch(TasksActions.filterTaskDates({dateRange: this.selectedDateRange}))
        }
      }
  }

  setOneDate() {
    //if user moves their cursor out of the calendar having selected only one date, the date range will be set for only one day
    if(this.selectedDateRange.start && !this.selectedDateRange.end){
      this.selectedDateRange = new DateRange<Date>(this.selectedDateRange.start, this.selectedDateRange.start);
    }
  }

  OnCheckBoxSelect(tag: string, event:any ) {
    if(event.target.checked && event.target.id != "#tag-delete-button"){
      this.activeTags = this.activeTags.concat(tag)
    } else {
      this.activeTags = this.activeTags.filter(addedTag => addedTag != tag)
    }
    this.store.dispatch(TasksActions.filterTaskTags({tags: this.activeTags}))
  }

  addNewTag($event: any){
    this.store.dispatch(UserActions.addNewTag({newTag: $event.target.value}))
    this.creatingNewTag = false;
  }


  deleteTag(tag: string) {
    this.store.dispatch(UserActions.deleteTag({tag: tag}))
  }

  openGroup(group: EventModel) {
    this.store.dispatch(EventActions.getCurrentEvent({eventId: group.id}))
  }

  toggleSidebar() {
    this.isSideBarVisible = !this.isSideBarVisible;
  }
}
