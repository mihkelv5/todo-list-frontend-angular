import {createAction, props} from "@ngrx/store";
import {TaskModel} from "../../model/task.model";
import {EventModel} from "../../model/event.model";

export class EventActions {

}


export const getAllEvents = createAction('[Event] Get All Events');

export const getAllEventsSuccess = createAction('[Event] Get All Events Success',
  props<{events: EventModel[]}>()
);

export const getCurrentEvent = createAction('[Event] Get Current Event',
  props<{eventId: string}>()
);

export const getCurrentEventSuccess = createAction('[Event] Get Current Event Success',
  props<{currentEvent: EventModel | null}>()
);

export const getEventTasks = createAction('[EventTask] Get Event Tasks',
  props<{eventId: string}>()
);
export const getEventTasksSuccess = createAction('[EventTask] Get Event Tasks Success',
  props<{ eventTasks: TaskModel[]}>()
);


