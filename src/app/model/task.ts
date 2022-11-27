export class Task {
  id: number;
  date: Date;
  isComplete: boolean;
  title: string;
  description: string;
  xLocation: number;
  yLocation: number;
  color: string;


  constructor(id: number, date: Date, isComplete: boolean, title: string, description: string, xLocation: number, yLocation: number, color:string) {
    this.id = id;
    this.date = date;
    this.isComplete = isComplete;
    this.title = title;
    this.description = description;
    this.xLocation = xLocation;
    this.yLocation = yLocation;
    this.color = color;
  }
}
