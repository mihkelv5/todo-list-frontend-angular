import {UserStateInterface} from "./userStateInterface";
import {EventStateInterface} from "./EventStateInterface";
import {TaskStateInterface} from "./TaskStateInterface";

export interface AppStateInterface {
  userTasks: TaskStateInterface,
  userEvents: EventStateInterface,
  currentUser: UserStateInterface,
}
