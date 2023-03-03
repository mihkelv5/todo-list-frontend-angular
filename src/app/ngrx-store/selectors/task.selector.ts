import {AppStateInterface} from "../state/appState.interface";
import {createAction, createSelector} from "@ngrx/store";
import {TaskModel} from "../../model/task.model";
import {PublicUserModel} from "../../model/user/publicUser.model";
import * as events from "events";


export const selectFeature = (state: AppStateInterface) => state.userTasks;

export const getTasksSelector = (eventId: string | null) => createSelector(selectFeature, (state) => {
    if(eventId){
        return state.tasks.filter(task => task.eventId == eventId)
    } else {
        return state.tasks.filter(task => task.eventId == undefined)
    }
});

export const getAreTasksLoaded = createSelector(selectFeature, (state) => state.userTasksLoaded)

export const getAreCurrentEventTasksLoaded = (eventId: string) => createSelector(selectFeature, (state) => {
    return !!state.eventIdsThatHaveTasksLoaded.find(id => eventId == id);

})

export const getUserTaskDetails = (taskId: string) => createSelector(selectFeature, (state) => state.tasks.find(task => task.id == taskId));

export const getTaskDetails = (taskId: string | null) => createSelector(selectFeature, (state) => {

    let tempTask = null
    if(taskId){

        tempTask = state.tasks.find(task => task.id == taskId)

    }
    if(tempTask){
        return tempTask
    }
    return new TaskModel(null, new Date(), false, "", "", 0, 0, "", new PublicUserModel("", "", "", 0, 0, 0, 0), [] )
})


