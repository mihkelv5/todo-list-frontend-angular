import {AppStateInterface} from "../state/appState.interface";
import {createSelector} from "@ngrx/store";
import {TaskModel} from "../../model/task.model";
import {PublicUserModel} from "../../model/user/publicUser.model";


export const selectFeature = (state: AppStateInterface) => state.userTasks;

export const getUserTasksSelector = createSelector(selectFeature, (state) => state.tasks);

export const getEventTasksSelector = createSelector(selectFeature, (state) => state.eventTasks);

export const getUserTaskDetails = (taskId: string) => createSelector(selectFeature, (state) => state.tasks.find(task => task.id == taskId));

export const getTaskDetails = (taskId: string | null, eventId: string | null) => createSelector(selectFeature, (state) => {

    let tempTask = null
    if(taskId){
        if(!eventId || eventId == ""){
            tempTask = state.tasks.find(task => task.id == taskId)
        } else {
            tempTask = state.eventTasks.find(task => task.id == taskId)

        }
    }
    if(tempTask){
        return tempTask
    }
    return new TaskModel(null, new Date(), false, "", "", 0, 0, "", new PublicUserModel(""), [] )

     })


