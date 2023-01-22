import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EventService} from "../../service/event.service";
import * as EventActions from "../actions/events.actions";
import {exhaustMap, of, map} from "rxjs";
import {Injectable} from "@angular/core";
import {TaskService} from "../../service/task.service";
import {EventModel} from "../../model/event.model";

@Injectable()
export class EventsEffects{


  constructor(private actions$: Actions, private eventService: EventService, private taskService: TaskService) {}

  getCurrentEvent$ = createEffect(() =>
    this.actions$.pipe(ofType(EventActions.getCurrentEvent),
      exhaustMap((action) => {
        if(action.eventId == ""){
          return of(new EventModel("", "", "")).pipe(map(
            currentEvent => EventActions.getCurrentEventSuccess({currentEvent})
          ))
        } else {
          return this.eventService.findEventById(action.eventId).pipe(map(
            currentEvent => EventActions.getCurrentEventSuccess({currentEvent})
          ))
        }
      }))
  );

  getUserEvents$ = createEffect(() =>
    this.actions$.pipe(ofType(EventActions.getAllEvents),
      exhaustMap(() => {
        return this.eventService.findEventsByUser().pipe(map(
          events => EventActions.getAllEventsSuccess({events})
        ))
      }))
  )

}
