import {createAction, props} from "@ngrx/store";
import {EventModel} from "../../model/event.model";
import {PublicUserModel} from "../../model/user/publicUser.model";




export class EventActions {

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

export const addEvent = createAction('[Event] Creating New Event...',
    props<{event: EventModel}>());

export const addEventSuccess = createAction('[Event] Created New Event Success',
    props<{event: EventModel}>());

export const editEvent = createAction('[Event] Editing Event...',
    props<{event: EventModel}>());

export const editEventSuccess = createAction('[Event] Edited Event Success',
    props<{event: EventModel}>());


//TODO: create new actions for Invites

export const inviteUsersToEvent = createAction('[Invite] Invite Users To Event',
    props<{eventId: string, invitedUsers: string[]}>());

export const inviteUsersToEventSuccess = createAction('[Invite] Invite Users To Event Success',
    props<{invitedUsers: PublicUserModel[]}>());

export const removeAlreadyInvitedUser = createAction('[Invite] Remove Invited User',
    props<{eventId: string, invitedUsername: string}>());

export const removeAlreadyInvitedUserSuccess = createAction('[Invite] Remove Invited User Success',
    props<{removedUser: PublicUserModel}>());

export const getUsersThatCanBeInvitedSuccess = createAction('[Invite] Getting Users That Can Be Invited Success',
    props<{canBeInvitedUsers: PublicUserModel[]}>());

export const moveUserToWaitingList = createAction('[Invite] Moved user to waiting list',
    props<{addedUser: PublicUserModel}>());

export const removeUserFromWaitingList = createAction('[Invite] Removed user from waiting list',
    props<{removedUser: PublicUserModel}>());

export const cancelInvite = createAction('[Invite] Canceled inviting users')
