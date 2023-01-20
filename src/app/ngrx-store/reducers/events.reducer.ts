import {EventStateInterface} from "../state/EventStateInterface";
import {createReducer, on} from "@ngrx/store";
import * as EventActions from "../actions/eventActions";

export const initialState: EventStateInterface = {
  events: [],
  currentEvent: null,
}

export const eventsReducers = createReducer(initialState,


  on(EventActions.getCurrentEventSuccess, (state, action) => ({
    ...state,
    currentEvent: action.currentEvent
  })),

)
