import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EventService} from "../../service/event.service";
import * as EventActions from "../actions/events.actions";
import {exhaustMap, of, map, mergeMap, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {TaskService} from "../../service/task.service";
import {EventModel} from "../../model/event.model";
import {InviteService} from "../../service/invite.service";

@Injectable()
export class EventsEffects{


  constructor(private actions$: Actions, private eventService: EventService, private inviteService: InviteService) {}

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

  getUserEvents$ = createEffect(() =>
    this.actions$.pipe(ofType(EventActions.getAllEvents),
      exhaustMap(() => {
        return this.eventService.findEventsByUser().pipe(map(
          events => EventActions.getAllEventsSuccess({events})
        ))
      }))
  );

    deleteCurrentEvent$ = createEffect(() =>
        this.actions$.pipe(ofType(EventActions.deleteEvent),
            mergeMap((action) => {
                return this.eventService.deleteEvent(action.eventId).pipe(map(
                    () => EventActions.deleteEventSuccess({eventId: action.eventId})
                ))
    })));


    inviteUsersToEvent$ = createEffect(() =>
        this.actions$.pipe(ofType(EventActions.inviteUsersToEvent),
            switchMap((action) => {
                return this.inviteService.inviteUserToEvent(action.eventId, action.invitedUsers).pipe(map(
                    users => EventActions.inviteUsersToEventSuccess({invitedUsers: users})
                ))
            }))
    );

    removeUserEventInvite$ = createEffect(() =>
        this.actions$.pipe(ofType(EventActions.removeAlreadyInvitedUser),
            switchMap((action) => {
                return this.inviteService.deleteInvite(action.eventId, action.invitedUsername).pipe(map(
                    response => EventActions.removeAlreadyInvitedUserSuccess({removedUser: response})
                ))
            }))
    );

    getUsersThatCanBeInvited$ = createEffect(() =>
        this.actions$.pipe(ofType(EventActions.getCurrentEventSuccess),
            switchMap((action) => {
                if(!action.currentEvent){
                    return of([]).pipe(map(
                        users => EventActions.getUsersThatCanBeInvitedSuccess({canBeInvitedUsers: users})
                    ))
                }
                return this.inviteService.findUsersToInvite(action.currentEvent.id).pipe(map(
                    users => EventActions.getUsersThatCanBeInvitedSuccess({canBeInvitedUsers: users})
                ))
            }))
    );
}
