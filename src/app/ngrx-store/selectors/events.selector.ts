import {AppStateInterface} from "../state/appState.interface";
import {createSelector} from "@ngrx/store";


export const eventSelectFeature = (state: AppStateInterface) => state.userEvents;

export const getEventsSelector = createSelector(eventSelectFeature, (state) => state.events);

export const getCurrentEventSelector = createSelector(eventSelectFeature, (state) => state.currentEvent);

export const getCurrentEventById = (eventId: string | null) => createSelector(eventSelectFeature, (state) => state.events.find(event => event.id == eventId))
