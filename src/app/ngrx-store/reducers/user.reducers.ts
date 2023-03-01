
import {UserStateInterface} from "../state/userStateInterface";
import {PrivateUserModel} from "../../model/user/privateUser.model";
import {createReducer, on} from "@ngrx/store";
import * as UsersActions from "../actions/user.actions";

export  const initialState: UserStateInterface = {
    loggedIn: false,
    privateUser: new PrivateUserModel("", "", "", ""),
    invites: [],


}

export const userReducers = createReducer(initialState,
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
        ...state,
        invites: [...state.invites.filter(invite => invite.id !== action.inviteId)]
    }
  })
  )



