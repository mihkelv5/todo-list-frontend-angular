import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Task} from "../model/task";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private host = environment.apiBaseUrl;

  constructor(private http: HttpClient) {

  }

  public addEvent(event: Event): Observable<Task> {
    return this.http.post<Task>(this.host + "/event/add", event);
  }

  public loadEventsFromDB(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.host + "/task/user/" + id + "/tasks");
  }
}
