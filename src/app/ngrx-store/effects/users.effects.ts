import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../../service/user.service";
import * as UsersActions from "../actions/users.actions";
import {exhaustMap, map} from "rxjs";

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions, private userService: UserService) {}

    getUserData$ = createEffect(() =>
      this.actions$.pipe(ofType(UsersActions.getUserData),
        exhaustMap(() =>{
          return this.userService.loadUserData().pipe(map(
            userData => UsersActions.getUserDataSuccess({userData})
          ))
        }))
    )

}
