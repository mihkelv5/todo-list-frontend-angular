import {AppStateInterface} from "../state/appState.interface";
import {createSelector} from "@ngrx/store";

export const userSelectFeature = (state: AppStateInterface) => state.currentUser;

export const getUserDataSelector = createSelector(userSelectFeature, (state) => state.privateUser)
