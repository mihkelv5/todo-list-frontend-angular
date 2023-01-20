import {PublicUserModel} from "./publicUser.model";
import {TaskModel} from "./task.model";

export class EventModel {

  id: string;
  title: string;
  description: string;
  eventUsernames?: PublicUserModel[];
  tasks?: TaskModel[]


  constructor(id: string, title: string, description: string, eventUsernames?: PublicUserModel[], tasks?: TaskModel[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.eventUsernames = eventUsernames;
    this.tasks = tasks;
  }

}
