import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../../service/user.service";
import * as UsersActions from "../actions/users.actions";
import {concatMap, exhaustMap, map} from "rxjs";
import {InviteService} from "../../service/invite.service";
import {AuthenticationService} from "../../service/authentication.service";

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions, private userService: UserService, private inviteService: InviteService,
              private authService: AuthenticationService) {}

    getUserData$ = createEffect(() =>
      this.actions$.pipe(ofType(UsersActions.getUserData),
        exhaustMap(() =>{
          return this.userService.loadUserData().pipe(map(
            userData => UsersActions.getUserDataSuccess({userData})
          ))
        }))
    )

    getUserInvites$ = createEffect(() =>
    this.actions$.pipe(ofType(UsersActions.getUserDataSuccess || UsersActions.getUserInvites ),
        exhaustMap(() => {
            return this.inviteService.getUserInvitations().pipe(map(
                invites => UsersActions.getUserInvitesSuccess({invites})
            ))
        }) )
    )

  respondToInvite$ = createEffect( () =>
    this.actions$.pipe(ofType(UsersActions.respondToInvite),
      concatMap((action) => {
        return this.inviteService.respondToInvite(action.inviteId, action.accepted).pipe(map(
          (eventModel) => UsersActions.respondToInviteSuccess({inviteId: action.inviteId, accepted: action.accepted, eventModel: eventModel})
        ))

      }))
  )


  logoutUser$ = createEffect(() =>
    this.actions$.pipe(ofType(UsersActions.logout),
      exhaustMap(() => {
        return this.authService.logout().pipe(map(
          () => UsersActions.logoutSuccess()
        ))
      })
      )
  )


}
