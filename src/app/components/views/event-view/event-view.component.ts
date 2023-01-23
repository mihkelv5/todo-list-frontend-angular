import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../service/event.service";
import {map, Observable, of, Subscription, take, tap} from "rxjs";
import {TaskService} from "../../../service/task.service";
import {TaskModel} from "../../../model/task.model";
import {EventModel} from "../../../model/event.model";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {faPencil, faUsers} from "@fortawesome/free-solid-svg-icons";
import {InviteService} from "../../../service/invite.service";
import {select, Store} from "@ngrx/store";
import * as TasksActions from "../../../ngrx-store/actions/tasks.actions";
import * as EventActions from "../../../ngrx-store/actions/events.actions";
import * as EventSelectors from "../../../ngrx-store/selectors/events.selector"
import * as EventsSelectors from "../../../ngrx-store/selectors/events.selector";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {PublicUserModel} from "../../../model/user/publicUser.model";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit, OnDestroy {
  faPenToSquare = faPenToSquare;
  faPencil = faPencil;
  faUsers = faUsers;
  faTrashCan = faTrashCan;
  openParticipatorsWindow = false;


  isEventLoaded = false;

  currentEvent!: EventModel;
  subscriptions: Subscription[] = [];
  tasks: TaskModel[] = [];
  deleteEventConfirmation = false;
  currentEvent$: Observable<EventModel>;


  constructor(private eventService: EventService,
              private route: ActivatedRoute, private router: Router,
              private inviteService: InviteService,
              private store: Store<AppStateInterface>) {
    const routeId = this.route.snapshot.paramMap.get("eventId");
    if (routeId) {
      this.store.dispatch(EventActions.getCurrentEvent({eventId: routeId}))
        this.store.dispatch(TasksActions.getEventTasks({eventId: routeId}))
    }
    this.currentEvent$ = this.store.pipe(select(EventsSelectors.getCurrentEventSelector))
  }


  ngOnInit(): void {
    this.subscriptions.push(
        this.currentEvent$.subscribe(
        currentEvent => {
            if(currentEvent.id !== ""){
                this.currentEvent = currentEvent;
                this.isEventLoaded = true;

            }
        }
    )
)



  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }


  createTask() {
    this.router.navigateByUrl("/task/new/" + this.currentEvent.id + "/" + this.currentEvent.title)
  }

  editEvent() {
    this.router.navigateByUrl("/event/edit/" + this.currentEvent.id)
  }

  deleteEvent() {
    this.store.dispatch(EventActions.deleteEvent({eventId: this.currentEvent.id}));
    this.deleteEventConfirmation = false;
    this.router.navigateByUrl("/home");

  }

  toggleDeleteEventConfirmation(bool: boolean){
    this.deleteEventConfirmation = bool;
  }

  toggleParticipatorWindow(bool: boolean) {
    this.openParticipatorsWindow = bool;
  }

  inviteUsers($event: PublicUserModel[]) {
    if($event.length != 0){ //if nothing is changed then don't let user make an empty request
        const usernames = $event.map(user => user.username)
          this.inviteService.inviteUserToEvent(this.currentEvent.id, usernames).subscribe(response => {
            //console.log(response);
            //TODO: confirmation notification
              this.openParticipatorsWindow = false;
          })


    }


  }
}
