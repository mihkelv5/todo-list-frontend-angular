import {createAction, props} from "@ngrx/store";
import {TaskModel} from "../../model/task.model";

export class TasksActions {

}

export const getUserTasks = createAction('[Tasks] Get tasks');

export const getUserTasksSuccess = createAction('[Tasks] Get Tasks Success',
  props<{ tasks: TaskModel[] }>()
);

export const getTasksFailure = createAction('[Tasks] Get Tasks Failure',
  props<{ error: string}>()
);

export const getEventTasks = createAction('[Event Tasks] Get Event tasks',
  props<{eventId: string}>()
);
export const getEventTasksSuccess = createAction('[Event Tasks] Get Event tasks Success',
  props<{eventId: string, eventTasks: TaskModel[]}>()
);

export const addTask = createAction('[Tasks] Add task',
  props<{task: TaskModel, eventId: string}>()
);

export const addTaskSuccess = createAction('[Tasks] Add Task Success',
  props<{task: TaskModel, eventId: string}>()
);

export const deleteTask = createAction('[Tasks] Delete task',
  props<{taskId: string, eventId: string}>()
);

export const deleteTaskSuccess = createAction('[Tasks] Delete task',
  props<{taskId: string, eventId: string}>()
);

export const completeTask = createAction('[Tasks] Complete Task',
  props<{ taskId: string, isComplete: boolean, eventId: string}>()
);

export const completeTaskSuccess = createAction('[Tasks] Complete Task Success',
  props<{ task: TaskModel, eventId: string}>()
);

export const moveTask = createAction('[Tasks] Move Task',
  props<{taskId: string, xLocation: number, yLocation: number, eventId: string}>()
);

export const moveTaskSuccess = createAction('[Tasks] Move Task Success',
  props<{task: TaskModel, eventId: string}>()
);

