import {Action, createAction, props} from "@ngrx/store";
import {TaskModel} from "../../model/task.model";


export const loadUserTasksFromApi = createAction('[Tasks] Get User Tasks');

export const loadUserTasksFromApiSuccess = createAction('[Tasks] Get User Tasks Success',
  props<{tasks: TaskModel[]}>()
);

export const addTask = createAction(
  '[Tasks] Create',
  props<{
    title: string,
    description: string
  }>()
);



export const deleteTask = createAction(
  '[Tasks] Delete',
    props<{id: number}>()
);


export const moveTask = createAction(
  '[Tasks] Move',
  props<{id: number,
    xCoord: number,
    yCoord: number
  }>()
);
