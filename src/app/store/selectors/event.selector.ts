import {AppStateInterface} from "../state/appState.interface";
import {createSelector} from "@ngrx/store";


export const selectFeature = (state: AppStateInterface) => state.events;

export const eventsSelector = createSelector(selectFeature, (state) => state.events);
