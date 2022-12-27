import {TasksStateInterface} from "./tasksStateInterface";
import {EventStateInterface} from "./eventStateInterface";


export interface AppStateInterface {
  tasks: TasksStateInterface;
  events: EventStateInterface;
}
