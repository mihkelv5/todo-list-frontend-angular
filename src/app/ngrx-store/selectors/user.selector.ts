import {AppStateInterface} from "../state/appState.interface";
import {createSelector} from "@ngrx/store";

export const userSelectFeature = (state: AppStateInterface) => state.currentUser;

export const getUserDataSelector = createSelector(userSelectFeature, (state) => state.privateUser);

export const isUserLoggedIn = createSelector(userSelectFeature, state => state.loggedIn);

export const getUserInvites = createSelector(userSelectFeature, state => state.invites);

export const selectResponseMessage = createSelector(userSelectFeature, state => state.responseMessage)

