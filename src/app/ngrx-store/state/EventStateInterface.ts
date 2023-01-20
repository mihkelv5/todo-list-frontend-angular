import {EventModel} from "../../model/event.model";

export interface EventStateInterface {
  events: EventModel[];
  currentEvent: EventModel | null;
}
