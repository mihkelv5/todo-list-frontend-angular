
import {UsersStateInterface} from "../state/usersStateInterface";
import {PrivateUserModel} from "../../model/user/privateUser.model";
import {createReducer, on} from "@ngrx/store";
import * as UsersActions from "../actions/users.actions";

export  const initialState: UsersStateInterface = {
    loggedIn: false,
    privateUser: new PrivateUserModel("", "", ""),
    invites: [],


}

export const usersReducers = createReducer(initialState,
  on(UsersActions.getUserDataSuccess, (state, action) => {
    return {
      ...state,
        loggedIn: true,
      privateUser: action.userData,
    }
  }),

    on(UsersActions.getUserInvitesSuccess, (state, action) => {
        return {
            ...state,
            invites: action.invites
        }
    }),

  on(UsersActions.logoutSuccess, () => {
    return {
      ...initialState
    }
  }),

  on(UsersActions.respondToInviteSuccess, (state, action) => {

      return {
        ...state, //everything else will stay the same
        invites: [...state.invites.filter(invite => invite.id !== action.inviteId)]
    }
  })
  )



