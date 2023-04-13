import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../model/user/user.model";
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

  public deleteEvent(eventId: string) {
    return this.http.delete(this.host + "/delete/" + eventId );
  }

  public updateEvent(event: EventModel): Observable<EventModel> {
    return this.http.put<EventModel>(this.host +  "/update" , event);
  }

  public findEventById(eventId: string): Observable<EventModel> {
    return this.http.get<EventModel>(this.host + "/find/" + eventId)
  }

  public findEventsByUser(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.host + "/all");
  }

  public findUsersByEvent(eventId: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.host + "/" + eventId + "/users");
  }


  public addNewTag(newTag: string, eventId: string): Observable<string> {
    return this.http.post<string>(this.host + "/" + eventId + "/tags/add", newTag);
  }

  public deleteTag(tag: string, eventId: string) {
    return this.http.delete(this.host + "/" + eventId + "/tags/delete/" + tag);
  }



}
