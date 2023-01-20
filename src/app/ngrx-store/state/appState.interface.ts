import {CurrentUserStateInterface} from "./currentUserStateInterface";
import {EventStateInterface} from "./EventStateInterface";
import {TasksStateInterface} from "./TasksStateInterface";

export interface AppStateInterface {
  userTasks: TasksStateInterface,
  userEvents: EventStateInterface,
  currentUser: CurrentUserStateInterface,
}
