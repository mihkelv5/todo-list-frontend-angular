import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {EventInvitationModel} from "../model/eventInvitation.model";
import {PublicUserModel} from "../model/user/publicUser.model";
import {EventModel} from "../model/event.model";

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private http: HttpClient) {
  }

  private host = environment.apiBaseUrl + "/invite";

  public inviteUserToEvent(eventId: string, usernames: string[]): Observable<PublicUserModel[]> {
    return this.http.post<PublicUserModel[]>(this.host + "/event/" + eventId, usernames);
  }

  public getUserInvitations(): Observable<EventInvitationModel[]> {
    return this.http.get<EventInvitationModel[]>(this.host + "/get/all");
  }


  public respondToInvite(inviteId: string, isAccepted: boolean): Observable<EventModel> {
    return this.http.put<EventModel>(this.host + "/respond/" + inviteId + "/accepted/" + isAccepted, "")
  }

  public deleteInvite( eventId: string, username: string): Observable<PublicUserModel>{
      return this.http.delete<PublicUserModel>(this.host + "/delete/" + eventId + "/user/" + username)
  }

  public findUsersToInvite(eventId: string): Observable<PublicUserModel[]> {
      if(eventId == ""){
          return of([]) //Temporary fix to situation where going back to main page will give error because api call was made to get users from event that doesn't exist.
      }
    return this.http.get<PublicUserModel[]>(environment.apiBaseUrl + "/user/notIn/event/" + eventId );
  }

}
