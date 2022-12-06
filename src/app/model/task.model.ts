

export class TaskModel {
  id: number;
  date: Date;
  complete: boolean;
  title: string;
  description: string;
  xLocation: number;
  yLocation: number;
  color: string;
  userId: number;
  eventId: number | undefined;
  eventName: string | undefined;


  constructor(id: number, date: Date, complete: boolean, title: string, description: string, xLocation: number,
              yLocation: number, color:string, ownerId:number, event_id: number | undefined, eventName: string | undefined ) {
    this.id = id;
    this.date = date;
    this.complete = complete;
    this.title = title;
    this.description = description;
    this.xLocation = xLocation;
    this.yLocation = yLocation;
    this.color = color;
    this.userId = ownerId;
    this.eventId = event_id;
    this.eventName = eventName;
  }
}
