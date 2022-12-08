export class EventInvitationModel {
  id: number;
  eventId: number
  eventName: string;
  requesterUsername: string;


  constructor(id: number, eventId: number, eventName: string, requesterUsername: string) {
    this.id = id;
    this.eventId = eventId;
    this.eventName = eventName;
    this.requesterUsername = requesterUsername;
  }
}
