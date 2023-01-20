import {AppStateInterface} from "../state/appState.interface";
import {createSelector} from "@ngrx/store";


export const selectFeature = (state: AppStateInterface) => state.tasks;

export const getUserTasksSelector = createSelector(selectFeature, (state) => state.tasks);

