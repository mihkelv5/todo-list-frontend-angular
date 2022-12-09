export class EventModel {

  id: number;
  title: string;
  description?: string;
  eventUsernames?: string[];


  constructor(id: number, title: string, description: string, eventUsernames?: string[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.eventUsernames = eventUsernames;
  }


}
