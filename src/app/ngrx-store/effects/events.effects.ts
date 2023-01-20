import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EventService} from "../../service/event.service";
import * as EventActions from "../actions/eventActions";
import {exhaustMap, of, map} from "rxjs";
import {Injectable} from "@angular/core";
import {TaskService} from "../../service/task.service";

@Injectable()
export class EventsEffects{


  constructor(private actions$: Actions, private eventService: EventService, private taskService: TaskService) {}

  getCurrentEvent$ = createEffect(() =>
    this.actions$.pipe(ofType(EventActions.getCurrentEvent),
      exhaustMap((action) => {
        if(action.eventId == ""){
          return of(null).pipe(map(
            currentEvent => EventActions.getCurrentEventSuccess({currentEvent})
          ))
        } else {
          return this.eventService.findEventById(action.eventId).pipe(map(
            currentEvent => EventActions.getCurrentEventSuccess({currentEvent})
          ))
        }
      }))
  );


}
