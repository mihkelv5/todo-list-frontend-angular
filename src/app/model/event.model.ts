import {PublicUserModel} from "./user/publicUser.model";
import {TaskModel} from "./task.model";

export class EventModel {

  id: string;
  title: string;
  description: string;
  eventUsers: PublicUserModel[];
  invitedUsers: PublicUserModel[];
  canBeInvited: PublicUserModel[];
  waitingList: PublicUserModel[];

  constructor(id: string, title: string, description: string, eventUsers?: PublicUserModel[], invitedUsers?: PublicUserModel[], canBeInvited?: PublicUserModel[]) {
    this.id = id;
    this.title = title;
    this.description = description
      if(eventUsers) {
        this.eventUsers = eventUsers;
      } else {
          this.eventUsers = [];
      }
      if(invitedUsers){
          this.invitedUsers = invitedUsers;
      } else {
          this.invitedUsers = [];
      }
      this.canBeInvited = [];
      this.waitingList = [];
  }

}
