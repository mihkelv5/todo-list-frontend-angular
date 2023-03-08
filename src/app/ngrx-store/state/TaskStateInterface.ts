import {TaskModel} from "../../model/task.model";
import {EventModel} from "../../model/event.model";
import {DateRange} from "@angular/material/datepicker";

export interface TaskStateInterface {
  tasks: TaskModel[];
  userTasksLoaded: boolean;
  eventIdsThatHaveTasksLoaded: string[];
  dateFilter: DateRange<Date>;
  activeTags: string [];
}
