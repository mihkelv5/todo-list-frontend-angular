

export class TaskModel {
  id: string | null;
  date: Date;
  complete: boolean;
  title: string;
  description: string;
  xLocation: number;
  yLocation: number;
  color: string;
  ownerUsername: string;
  eventId?: string;
  eventName?: string;
  assignedUsernames ?: string[];


  constructor(id: string | null, date: Date, complete: boolean, title: string, description: string, xLocation: number,
              yLocation: number, color:string, ownerUsername:string, event_id?:string, eventName?: string,
              assignedUsernames?: string[]) {
    this.id = id;
    this.date = date;
    this.complete = complete;
    this.title = title;
    this.description = description;
    this.xLocation = xLocation;
    this.yLocation = yLocation;
    this.color = color;
    this.ownerUsername = ownerUsername;
    this.eventId = event_id;
    this.eventName = eventName;
    this.assignedUsernames = assignedUsernames;
  }
}
