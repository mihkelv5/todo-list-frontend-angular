import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private host = environment.apiBaseUrl + "/event";

  constructor(private http: HttpClient) {

  }

  public addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.host + "/add", event);
  }

  public findEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(this.host + "/find/" + eventId)
  }

  public loadEventsFromDB(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(this.host + "/user/" + userId);
  }

  public registerUserToEvent(eventId: number, userId: number) {
    //should eventId and userId be in body?
    return this.http.put<number>(this.host + "/" + eventId + "/register" + userId, eventId);
  }

  public findUsersByEvent(eventId: number): Observable<User[]> {
    return this.http.get<User[]>(this.host + "/" + eventId + "/users");
  }
}
