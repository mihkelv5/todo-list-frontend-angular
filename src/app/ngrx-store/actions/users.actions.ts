import {createAction, props} from "@ngrx/store";
import {PrivateUserModel} from "../../model/user/privateUser.model";

export class UsersActions {}

export const getUserData = createAction('[User] Get User Data');

export const getUserDataSuccess = createAction('[User] Get user data Success',
  props<{userData: PrivateUserModel}>())
