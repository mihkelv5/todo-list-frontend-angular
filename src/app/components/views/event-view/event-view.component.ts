import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../service/event.service";
import {Observable, take} from "rxjs";
import {TaskModel} from "../../../model/task.model";
import {EventModel} from "../../../model/event.model";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {faPencil, faUsers} from "@fortawesome/free-solid-svg-icons";
import {InviteService} from "../../../service/invite.service";
import {select, Store} from "@ngrx/store";
import * as TasksActions from "../../../ngrx-store/actions/task.actions";
import * as EventActions from "../../../ngrx-store/actions/event.actions";
import * as TaskSelectors from "../../../ngrx-store/selectors/task.selector"
import * as EventsSelectors from "../../../ngrx-store/selectors/event.selector";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
    faPenToSquare = faPenToSquare;
    faPencil = faPencil;
    faUsers = faUsers;
    faTrashCan = faTrashCan;

    openParticipatorsWindow = false;
    isEventLoaded = false;
    deleteEventConfirmation = false;

    tasks: TaskModel[] = [];
    currentEvent!: EventModel;
    currentEvent$: Observable<EventModel | null>;


  constructor(private eventService: EventService,
              private route: ActivatedRoute, private router: Router,
              private store: Store<AppStateInterface>) {
    const routeId = this.route.snapshot.paramMap.get("eventId");
    if (routeId) {

        //first time in session where user redirects from homepage to an event view
        this.store.select(TaskSelectors.getAreCurrentEventTasksLoaded(routeId)).pipe(take(1)).subscribe(
            bool => {
                if(!bool){
                    this.store.dispatch(TasksActions.getEventTasks({eventId: routeId}))
                }
            }
        )

        this.store.dispatch(EventActions.getCurrentEvent({eventId: routeId}))
    }
    this.currentEvent$ = this.store.pipe(select(EventsSelectors.getCurrentEventSelector))
  }
  ngOnInit(): void {
  }




  createTask(eventId: string, eventTitle: string) {
    this.router.navigateByUrl("/task/new/" + eventId + "/" + eventTitle)
  }

  editEvent(eventId: string) {
    this.router.navigateByUrl("/event/edit/" + eventId)
  }

  deleteEvent(eventId: string) {
    this.store.dispatch(EventActions.deleteEvent({eventId: eventId}));
    this.deleteEventConfirmation = false;
    this.router.navigateByUrl("/home");

  }

  toggleDeleteEventConfirmation(bool: boolean){
    this.deleteEventConfirmation = bool;
  }

  toggleParticipatorWindow(bool: boolean) {
    this.openParticipatorsWindow = bool;
  }


}
