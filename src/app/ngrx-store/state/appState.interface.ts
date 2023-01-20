import {CurrentUserStateInterface} from "./currentUserStateInterface";
import {EventStateInterface} from "./EventStateInterface";
import {TasksStateInterface} from "./TasksStateInterface";

export interface AppStateInterface {
  tasks: TasksStateInterface,
  events: EventStateInterface,
  currentUser: CurrentUserStateInterface
}
