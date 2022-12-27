export class EventInvitationModel {
  id: string;
  eventId: number
  eventName: string;
  requesterUsername: string;


  constructor(id: string, eventId: number, eventName: string, requesterUsername: string) {
    this.id = id;
    this.eventId = eventId;
    this.eventName = eventName;
    this.requesterUsername = requesterUsername;
  }
}
