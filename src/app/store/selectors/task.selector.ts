import {AppStateInterface} from "../state/appStateInterface";
import {createSelector} from "@ngrx/store";

export const selectFeature = (state: AppStateInterface) => state.tasks;

export const allTasksSelector = createSelector(selectFeature,
  (state) => state.tasks);
