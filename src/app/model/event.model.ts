export class EventModel {

  id: string;
  title: string;
  description?: string;
  eventUsernames?: string[];


  constructor(id: string, title: string, description: string, eventUsernames?: string[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.eventUsernames = eventUsernames;
  }


}
