import {EventStateInterface} from "../state/EventStateInterface";
import {createReducer, on} from "@ngrx/store";
import * as EventActions from "../actions/events.actions";
import {EventModel} from "../../model/event.model";

export const initialState: EventStateInterface = {
  events: [],
  currentEvent: new EventModel("", "", ""),
}

export const eventsReducers = createReducer(initialState,


  on(EventActions.getCurrentEventSuccess, (state, action) => ({
    ...state,
    currentEvent: action.currentEvent
  })),
  on(EventActions.getAllEventsSuccess, (state, action) => {
    return{
      ...state,
      events: action.events
    }
  }),

    on(EventActions.deleteEventSuccess, (state, action) => {
        return {
            ...state,
            events: [...state.events.filter(event => event.id !== action.eventId)],
            currentEvent: new EventModel("", "", "")
        }}),

    on(EventActions.inviteUsersToEventSuccess, (state, action) => {
        return {
            ...state,
            currentEvent: {...state.currentEvent,
                invitedUsers: state.currentEvent.invitedUsers.concat(action.invitedUsers) }
        }
    }),

    on(EventActions.removeAlreadyInvitedUserSuccess, (state, action) => {
        return {
            ...state,
            currentEvent: {...state.currentEvent,
                invitedUsers: [...state.currentEvent.invitedUsers.filter(user => user.username != action.removedUser.username)]
            }
        }
    })

)
