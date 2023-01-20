import {PublicUserModel} from "./publicUser.model";


export class TaskModel {
  id: string | null;
  date: Date;
  complete: boolean;
  title: string;
  description: string;
  xLocation: number;
  yLocation: number;
  color: string;
  owner: PublicUserModel;
  assignedUsers : PublicUserModel[];
  eventId?: string;
  eventName?: string;


  constructor(id: string | null, date: Date, complete: boolean, title: string, description: string, xLocation: number,
              yLocation: number, color:string, owner: PublicUserModel, assignedUsers: PublicUserModel[],  event_id?:string, eventName?: string
              ) {
    this.id = id;
    this.date = date;
    this.complete = complete;
    this.title = title;
    this.description = description;
    this.xLocation = xLocation;
    this.yLocation = yLocation;
    this.color = color;
    this.owner = owner;
    this.assignedUsers = assignedUsers;
    this.eventId = event_id;
    this.eventName = eventName;
  }
}
