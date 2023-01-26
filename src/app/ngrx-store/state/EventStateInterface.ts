import {EventModel} from "../../model/event.model";
import {TaskModel} from "../../model/task.model";

export interface EventStateInterface {
  events: EventModel[];
  currentEvent: EventModel | null;
}
