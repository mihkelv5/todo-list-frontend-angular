import {TaskModel} from "../../model/task.model";
import {EventModel} from "../../model/event.model";

export interface TaskStateInterface {
  tasks: TaskModel[];
  userTasksLoaded: boolean;
  eventIdsThatHaveTasksLoaded: string[]
}
