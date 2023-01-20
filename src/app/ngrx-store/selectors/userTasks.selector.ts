import {AppStateInterface} from "../state/appState.interface";
import {createSelector} from "@ngrx/store";


export const selectFeature = (state: AppStateInterface) => state.userTasks;

export const getUserTasksSelector = createSelector(selectFeature, (state) => state.tasks);

export const getEventTasksSelector = createSelector(selectFeature, (state) => state.eventTasks);
