import {EventStateInterface} from "../state/EventStateInterface";
import {createReducer, on} from "@ngrx/store";
import * as EventActions from "../actions/events.actions";
import {EventModel} from "../../model/event.model";

export const initialState: EventStateInterface = {
  events: [],
  currentEvent: new EventModel("", "", "" ),
}

export const eventsReducers = createReducer(initialState,


  on(EventActions.getCurrentEventSuccess, (state, action) => ({
    ...state,
    currentEvent: {
        ...action.currentEvent

    },
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

    on(EventActions.getUsersThatCanBeInvitedSuccess, (state, action) => {
        return {
            ...state,
            currentEvent: {...state.currentEvent,
                canBeInvited: action.canBeInvitedUsers,
                waitingList: []
            }
        }
    }),

    on(EventActions.inviteUsersToEventSuccess, (state, action) => {
        return {
            ...state,
            currentEvent: {...state.currentEvent,
                invitedUsers: [...state.currentEvent.invitedUsers.concat(action.invitedUsers)],
                canBeInvited: [...state.currentEvent.canBeInvited.filter(users => !action.invitedUsers.includes(users))],
                waitingList: []
            }
        }
    }),

    on(EventActions.removeAlreadyInvitedUserSuccess, (state, action) => {
        return {
            ...state,
            currentEvent: {...state.currentEvent,
                invitedUsers: [...state.currentEvent.invitedUsers.filter(user => user.username != action.removedUser.username)],
                canBeInvited: [...state.currentEvent.canBeInvited.concat(action.removedUser)]
            }
        }
    }),

    on(EventActions.moveUserToWaitingList, (state, action) => {

        return {

            ...state,
            currentEvent: {...state.currentEvent,
                canBeInvited: [...state.currentEvent.canBeInvited.filter(user => user.username != action.addedUser.username)],
                waitingList: state.currentEvent.waitingList.concat(action.addedUser)
            }
        }
    }),

    on(EventActions.removeUserFromWaitingList, (state, action) => {
        return {
            ...state,
            currentEvent: {...state.currentEvent,
                waitingList: [...state.currentEvent.waitingList.filter(user => user.username != action.removedUser.username)],
                canBeInvited: state.currentEvent.canBeInvited.concat(action.removedUser)
            }
        }
    }),

    on(EventActions.cancelInvite, (state) => {
        return {
            ...state,
            currentEvent: {...state.currentEvent,
                canBeInvited: state.currentEvent.canBeInvited.concat(state.currentEvent.waitingList),
                waitingList: []
            }
        }
    })
)
