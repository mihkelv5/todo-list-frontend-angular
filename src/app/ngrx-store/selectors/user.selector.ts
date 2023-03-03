import {AppStateInterface} from "../state/appState.interface";
import {createSelector} from "@ngrx/store";

export const userSelectFeature = (state: AppStateInterface) => state.currentUser;

export const getUserDataSelector = createSelector(userSelectFeature, (state) => state.privateUser);

export const isUserLoggedIn = createSelector(userSelectFeature, state => state.loggedIn);

export const getUserInvites = createSelector(userSelectFeature, state => state.invites);

export const selectErrorMessage = createSelector(userSelectFeature, state => state.errorMessage)
