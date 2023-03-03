import {EventStateInterface} from "../state/EventStateInterface";
import {createReducer, on} from "@ngrx/store";
import * as EventActions from "../actions/event.actions";
import {EventModel} from "../../model/event.model";
import * as UserActions from "../actions/user.actions";
import * as UsersActions from "../actions/user.actions";

export const initialState: EventStateInterface = {
  events: [],
  currentEvent: null,
}

export const eventsReducers = createReducer(initialState,


  on(EventActions.getCurrentEventSuccess, (state, action) => ({
    ...state,
    currentEvent: action.currentEvent
    ,
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
            currentEvent: null
        }}),

    on(EventActions.addEventSuccess, (state, action) => {
        return{
            ...state,
            events: state.events.concat(action.event),
            currentEvent: action.event
        }
    }),

    on(EventActions.editEventSuccess, (state, action) => {
        return {
            ...state,
            events: state.events.filter(event => event.id != action.event.id).concat(action.event),
            currentEvent: action.event
        }
    }),

    on(EventActions.getUsersThatCanBeInvitedSuccess, (state, action) => {
        if(!state.currentEvent){
            return state
        }
        return {
            ...state,
            currentEvent: {...state.currentEvent,
                canBeInvited: action.canBeInvitedUsers,
                waitingList: []
            }
        }
    }),

    on(EventActions.inviteUsersToEventSuccess, (state, action) => {
        if(!state.currentEvent){
            return state
        }
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
        if(!state.currentEvent){
            return state
        }
        return {
            ...state,
            currentEvent: {...state.currentEvent,
                invitedUsers: [...state.currentEvent.invitedUsers.filter(user => user.username != action.removedUser.username)],
                canBeInvited: [...state.currentEvent.canBeInvited.concat(action.removedUser)]
            }
        }
    }),

    on(EventActions.moveUserToWaitingList, (state, action) => {
        if(!state.currentEvent){
            return state
        }

        return {

            ...state,
            currentEvent: {...state.currentEvent,
                canBeInvited: [...state.currentEvent.canBeInvited.filter(user => user.username != action.addedUser.username)],
                waitingList: state.currentEvent.waitingList.concat(action.addedUser)
            }
        }
    }),

    on(EventActions.removeUserFromWaitingList, (state, action) => {
        if(!state.currentEvent){
            return state
        }
        return {
            ...state,
            currentEvent: {...state.currentEvent,
                waitingList: [...state.currentEvent.waitingList.filter(user => user.username != action.removedUser.username)],
                canBeInvited: state.currentEvent.canBeInvited.concat(action.removedUser)
            }
        }
    }),

    on(EventActions.cancelInvite, (state) => {
        if(!state.currentEvent){
            return state
        }
        return {
            ...state,
            currentEvent: {...state.currentEvent,
                canBeInvited: state.currentEvent.canBeInvited.concat(state.currentEvent.waitingList),
                waitingList: []
            }
        }
    }),

  on(UserActions.respondToInviteSuccess, (state, action) => {
    if(action.eventModel){
      return {
        ...state,
        events: state.events.concat(action.eventModel)
      }
    }
    return {
      ...state
    }
  }),
  on(UsersActions.logoutSuccess, () => {
    return {
      ...initialState
    }
  }),
)
