export class Task {
  id: number;
  date: Date;
  isComplete: boolean;
  title: string;
  description: string;
  xLocation: number;
  yLocation: number;
  color: string;
  user_id: number;
  event_id: number | undefined;


  constructor(id: number, date: Date, isComplete: boolean, title: string, description: string, xLocation: number,
              yLocation: number, color:string, user_id:number, event_id: number | undefined ) {
    this.id = id;
    this.date = date;
    this.isComplete = isComplete;
    this.title = title;
    this.description = description;
    this.xLocation = xLocation;
    this.yLocation = yLocation;
    this.color = color;
    this.user_id = user_id;
    this.event_id = event_id;
  }
}
