import {createAction, props} from "@ngrx/store";
import {TaskModel} from "../../model/task.model";
import {EventModel} from "../../model/event.model";
import {PublicUserModel} from "../../model/user/publicUser.model";

export class EventsActions {

}


export const getAllEvents = createAction('[Event] Get All Events');

export const getAllEventsSuccess = createAction('[Event] Get All Events Success',
  props<{events: EventModel[]}>()
);

export const getCurrentEvent = createAction('[Event] Get Current Event',
  props<{eventId: string}>()
);

export const getCurrentEventSuccess = createAction('[Event] Get Current Event Success',
  props<{currentEvent: EventModel | null}>()
);

export const deleteEvent = createAction('[Event] Delete Current Event',
    props<{eventId: string}>());

export const deleteEventSuccess = createAction('[Event] Delete Current Event Success',
    props<{eventId: string}>());


export const inviteUsersToEvent = createAction('[Event] Invite Users To Event',
    props<{eventId: string, invitedUsers: string[]}>());

export const inviteUsersToEventSuccess = createAction('[Event] Invite Users To Event Success',
    props<{invitedUsers: PublicUserModel[]}>());

export const removeAlreadyInvitedUser = createAction('[Event] Remove Invited User',
    props<{eventId: string, invitedUsername: string}>());

export const removeAlreadyInvitedUserSuccess = createAction('[Event] Remove Invited User Success',
    props<{removedUser: PublicUserModel}>());

export const getUsersThatCanBeInvitedSuccess = createAction('[Event] Getting Users That Can Be Invited Success',
    props<{canBeInvitedUsers: PublicUserModel[]}>());

export const moveUserToWaitingList = createAction('[Event] Moved user to waiting list',
    props<{addedUser: PublicUserModel}>());

export const removeUserFromWaitingList = createAction('[Event] Removed user from waiting list',
    props<{removedUser: PublicUserModel}>());

export const cancelInvite = createAction('[Event] Canceled inviting users')
