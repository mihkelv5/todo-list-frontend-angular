import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of, take} from "rxjs";
import {EventModel} from "../../../model/event.model";
import {PrivateUserModel} from "../../../model/user/privateUser.model";
import {DateRange} from "@angular/material/datepicker";
import {AuthenticationService} from "../../../service/authentication.service";
import {EventService} from "../../../service/event.service";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import * as TasksActions from "../../../ngrx-store/actions/task.actions";
import * as UserSelector from "../../../ngrx-store/selectors/user.selector";
import * as EventsSelector from "../../../ngrx-store/selectors/event.selector";
import * as TagsSelector from "../../../ngrx-store/selectors/tag.selector";
import * as EventActions from "../../../ngrx-store/actions/event.actions";
import * as UserActions from "../../../ngrx-store/actions/user.actions";
import {faPlus, faBars, faAngleLeft, faPencil, faUsers} from "@fortawesome/free-solid-svg-icons";
import {faImage, faTrashCan,faPenToSquare } from "@fortawesome/free-regular-svg-icons";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  faImage=faImage;
  faPlus = faPlus;
  faTrashCan = faTrashCan;
  faBars = faBars;
  faAngleLeft = faAngleLeft;
  faPenToSquare = faPenToSquare;
  faPencil = faPencil;
  faUsers = faUsers;

  @Input("group") group?: EventModel;
  @Output() windowOpenerEmitter = new EventEmitter<string>();

  groups$?: Observable<EventModel[]>
  currentUser$!: Observable<PrivateUserModel>
  tags$: Observable<string[] | undefined>

  selectedDateRange: DateRange<Date>
  activeTags: string[] = [];
  creatingNewTag: boolean = false;

  isSideBarVisible = true;

  constructor(private authService: AuthenticationService, private eventService: EventService, private router: Router, private store: Store<AppStateInterface>) {

    this.currentUser$ = this.store.pipe(select(UserSelector.getUserDataSelector));
    this.selectedDateRange = new DateRange<Date>(null, null);
    this.tags$ = of([])
    if(!this.group){
      this.groups$ = this.store.pipe(select(EventsSelector.getEventsSelector));
    }
  }

  ngOnInit() {
    if(this.group){
      this.tags$ = this.store.select(TagsSelector.getUserOrEventTags(this.group.id));
    } else {
      this.tags$ = this.store.select(TagsSelector.getUserOrEventTags(null));
    }
  }

  clickedOnEvent(eventId: string) {
    this.router.navigateByUrl("/event/" + eventId); //TODO: add guard that checks if event exists.
  }

  public getUserOrEventTags(user: PrivateUserModel): string[]{
    if(this.group){
      return this.group.taskTags;
    }
    return user.taskTags;
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

  onCheckBoxSelect(tag: string, event:any) {
    if(event.target.checked){
      this.activeTags = this.activeTags.concat(tag)
    } else {
      this.activeTags = this.activeTags.filter(addedTag => addedTag != tag)
    }
    this.store.dispatch(TasksActions.filterTaskTags({tags: this.activeTags}))
  }

  addNewTag($event: any){
    if(this.group){
      this.store.dispatch(EventActions.addNewTag({newTag: $event.target.value, eventId: this.group.id}))
    } else {
      this.store.dispatch(UserActions.addNewTag({newTag: $event.target.value}))
    }
    this.creatingNewTag = false;
  }


  deleteTag(tag: string) {
    const change = this.activeTags.length;
    this.activeTags = this.activeTags.filter(addedTag => addedTag != tag)
    if(this.activeTags.length != change){
      this.store.dispatch(TasksActions.filterTaskTags({tags: this.activeTags}))
    }
    if(this.group){
      this.store.dispatch(EventActions.deleteTag({tag: tag, eventId: this.group.id}))
    } else {
      this.store.dispatch(UserActions.deleteTag({tag: tag}))
    }
  }

  openGroup(group: EventModel) {
    this.store.dispatch(EventActions.getCurrentEvent({eventId: group.id}))
    this.router.navigateByUrl("/event/" + group.id);
  }

  toggleSidebar() {
    this.isSideBarVisible = !this.isSideBarVisible;
  }

  editGroup(eventId: string) {
    this.router.navigateByUrl("/event/edit/" + eventId)
  }

  toggleParentWindow(participatorWindow: string) {
    this.windowOpenerEmitter.emit(participatorWindow);
  }

  createNewGroup() {
    this.router.navigateByUrl("/event/edit/new")
  }
}
