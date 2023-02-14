import {createAction, props} from "@ngrx/store";
import {PrivateUserModel} from "../../model/user/privateUser.model";
import {EventInvitationModel} from "../../model/eventInvitation.model";
import {EventModel} from "../../model/event.model";

export class UserActions {}

export const login = createAction('[Authentication] Trying to log in');

export const loginSuccess = createAction('[Authentication] Logging in success');

export const getUserData = createAction('[User] Get User Data');

export const getUserDataSuccess = createAction('[User] Get user data Success',
  props<{userData: PrivateUserModel}>())

export const getUserInvites = createAction('[Invite] Get user event invites')

export const getUserInvitesSuccess = createAction('[Invite] Get user event invites',
    props<{invites: EventInvitationModel[]}>())

export const respondToInvite = createAction('[Invite] Sending response to invite',
  props<{inviteId: string, accepted: boolean}>());

export const respondToInviteSuccess = createAction('[Invite] Sending response to invite success',
  props<{inviteId: string, accepted: boolean, eventModel: EventModel | undefined}>());

export const logout = createAction('[User] Logging out')

export const logoutSuccess = createAction('[User] Logged out')
