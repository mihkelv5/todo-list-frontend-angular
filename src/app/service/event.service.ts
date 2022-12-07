import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {EventModel} from "../model/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private host = environment.apiBaseUrl + "/event";

  constructor(private http: HttpClient) {

  }

  public addEvent(event: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.host + "/add", event);
  }

  public deleteEvent(eventId: number) {
    return this.http.delete(this.host + "/delete/" + eventId);
  }

  public updateEvent(event: EventModel): Observable<EventModel> {
    console.log(event.id);
    return this.http.put<EventModel>(this.host + "/update", event);
  }

  public findEventById(eventId: number): Observable<EventModel> {
    return this.http.get<EventModel>(this.host + "/find/" + eventId)
  }

  public loadEventsFromDB(username: string): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.host + "/user/" + username);
  }


  public findUsersByEvent(eventId: number): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.host + "/" + eventId + "/users");
  }




}
