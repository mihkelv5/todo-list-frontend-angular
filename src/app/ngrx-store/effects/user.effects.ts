import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../../service/user.service";
import * as UsersActions from "../actions/user.actions";
import {catchError, concatMap, exhaustMap, map, of} from "rxjs";
import {InviteService} from "../../service/invite.service";
import {AuthenticationService} from "../../service/authentication.service";
import {PictureUploadService} from "../../service/picture.upload.service";

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userService: UserService, private inviteService: InviteService,
              private authService: AuthenticationService, private pictureUploadService: PictureUploadService) {}

    getUserData$ = createEffect(() =>
      this.actions$.pipe(ofType(UsersActions.getUserData),
        exhaustMap(() =>{
          return this.userService.loadUserData().pipe(map(
            userData => {
              return UsersActions.getUserDataSuccess({userData})
            },

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

  uploadProfilePicture$ = createEffect(() =>
    this.actions$.pipe(ofType(UsersActions.updateUserPicture),
        concatMap( (action) => {
            return this.pictureUploadService.upload(action.file).pipe(map(

              (response) => {
                return UsersActions.updateUserPictureSuccess({imageString: action.imageString, responseMessage: response.response})
              }

            ), catchError(error =>
              of(UsersActions.updateUserPictureFailure({responseMessage: "Error uploading image: " + error.error}))
            ))
        })
      )
  )


}
