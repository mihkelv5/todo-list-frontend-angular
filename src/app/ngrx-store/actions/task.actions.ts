import {createAction, props} from "@ngrx/store";
import {TaskModel} from "../../model/task.model";
import {PublicUserModel} from "../../model/user/publicUser.model";
import {DateRange} from "@angular/material/datepicker";

export class TaskActions {

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
  props<{task: TaskModel}>()
);

export const addTaskSuccess = createAction('[Tasks] Add Task Success',
  props<{task: TaskModel}>()
);

export const updateTask = createAction('[Tasks] Update task',
  props<{task: TaskModel}>()
);

export const updateTaskSuccess = createAction('[Tasks] Update task Success',
  props<{task: TaskModel}>()
);

export const deleteTask = createAction('[Tasks] Delete task',
  props<{taskId: string}>()
);

export const deleteTaskSuccess = createAction('[Tasks] Delete task Success',
  props<{taskId: string}>()
);

export const completeTask = createAction('[Tasks] Complete Task',
  props<{ taskId: string, isComplete: boolean, eventId: string | undefined}>()
);

export const completeTaskSuccess = createAction('[Tasks] Complete Task Success',
  props<{ task: TaskModel, eventId: string | undefined}>()
);

export const moveTask = createAction('[Tasks] Move Task',
  props<{taskId: string, xLocation: number, yLocation: number, eventId: string | undefined}>()
);

export const moveTaskSuccess = createAction('[Tasks] Move Task Success',
  props<{task: TaskModel, eventId: string | undefined}>()
);


export const saveTaskUsers = createAction('[Tasks] Saving assigned users',
    props<{taskId: string, assignedUsers: PublicUserModel[], eventId: string}>()
);

export const saveTaskUsersSuccess = createAction('[Tasks] Save assigned users SUCCESS',
    props<{task: TaskModel}>()
);

export const filterTaskTags = createAction('[Tasks] Active Task tags changed',
  props<{tags: string[]}>()
);

export const filterTaskDates = createAction('[Tasks] Active Task dates changed',
  props<{dateRange: DateRange<Date>}>()
);
