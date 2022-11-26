export class Task {
  id: number;
  date: Date;
  isComplete: boolean;
  title: String;
  description: String;
  xLocation: number;
  yLocation: number;


  constructor(id: number, date: Date, isComplete: boolean, title: String, description: String, xLocation: number, yLocation: number) {
    this.id = id;
    this.date = date;
    this.isComplete = isComplete;
    this.title = title;
    this.description = description;
    this.xLocation = xLocation;
    this.yLocation = yLocation;
  }
}
