import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {EventInvitationModel} from "../model/eventInvitation.model";

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private http: HttpClient) {
  }

  private host = environment.apiBaseUrl + "/invite/";

  public inviteUserToEvent(eventId: number, username: string) {
    return this.http.post(this.host + "event/" + eventId + "/user/" + username,"");
  }

  public getAllInvitationsByUsername(username: string): Observable<EventInvitationModel[]> {
    return this.http.get<EventInvitationModel[]>(environment.apiBaseUrl + "/user/" + username + "/invites/all");
  }


  public acceptInvite(invite: EventInvitationModel) {
    return this.http.put(this.host + "accept/" + invite.id, "")
  }

  public declineInvite(invite: EventInvitationModel) {
    return this.http.delete(this.host + "decline/" + invite.id)
  }

  public findUsernamesToInvite(eventId: number): Observable<string[]> {
    return this.http.get<string[]>(environment.apiBaseUrl + "/event/" + eventId + "/search/users");
  }
}
