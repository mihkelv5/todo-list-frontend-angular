export class EventModel {

  id: number;
  title: string;
  description: string | undefined;


  constructor(id: number, title: string, description: string | undefined) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
