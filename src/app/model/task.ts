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


  constructor(id: number, date: Date, isComplete: boolean, title: string, description: string, xLocation: number, yLocation: number, color:string, user_id:number) {
    this.id = id;
    this.date = date;
    this.isComplete = isComplete;
    this.title = title;
    this.description = description;
    this.xLocation = xLocation;
    this.yLocation = yLocation;
    this.color = color;
    this.user_id = user_id;
  }
}
