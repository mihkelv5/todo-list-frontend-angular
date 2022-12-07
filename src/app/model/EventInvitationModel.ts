export class EventInvitationModel {
  id: number;
  eventId: number
  eventName: string;
  inviteSender: string;


  constructor(id: number, eventId: number, eventName: string, inviteSender: string) {
    this.id = id;
    this.eventId = eventId;
    this.eventName = eventName;
    this.inviteSender = inviteSender;
  }
}
