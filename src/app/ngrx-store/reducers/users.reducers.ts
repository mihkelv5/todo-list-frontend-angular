
import {UsersStateInterface} from "../state/usersStateInterface";
import {PrivateUserModel} from "../../model/user/privateUser.model";
import {createReducer, on} from "@ngrx/store";
import * as UsersActions from "../actions/users.actions";

export  const initialState: UsersStateInterface = {
  privateUser: new PrivateUserModel("", "", "")

}

export const usersReducers = createReducer(initialState,
  on(UsersActions.getUserDataSuccess, (state, action) => {
    return {
      ...state,
      privateUser: action.userData,
    }
  })
  )
