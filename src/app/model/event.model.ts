import {PublicUserModel} from "./user/publicUser.model";
import {TaskModel} from "./task.model";

export class EventModel {

  id: string;
  title: string;
  description: string;
  eventUsers?: PublicUserModel[];
  invitedUsers?: PublicUserModel[];

  constructor(id: string, title: string, description: string, eventUsers?: PublicUserModel[], invitedUsers?: PublicUserModel[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.eventUsers = eventUsers;
    this.eventUsers = invitedUsers;
  }

}
