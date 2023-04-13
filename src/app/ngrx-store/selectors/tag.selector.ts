import {AppStateInterface} from "../state/appState.interface";
import {createSelector} from "@ngrx/store";
import {selectFeature} from "./task.selector";

export const everythingSelectFeature = (state: AppStateInterface) => state;

export const getUserOrEventTags = (eventId: string | null | undefined) => createSelector(everythingSelectFeature, (state) => {
  if(!eventId){
    return state.currentUser.privateUser.taskTags;
  } else {
    return state.userEvents.currentEvent?.taskTags;
  }
})
