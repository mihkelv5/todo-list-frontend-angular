import {PublicUserModel} from "./user/publicUser.model";
import {TaskModel} from "./task.model";

export class EventModel {

  id: string;
  title: string;
  description: string;
  eventUsernames?: PublicUserModel[];

  constructor(id: string, title: string, description: string, eventUsernames?: PublicUserModel[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.eventUsernames = eventUsernames;

  }

}
