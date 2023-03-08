import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskModel} from '../model/task.model'
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {PublicUserModel} from "../model/user/publicUser.model";


@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private host = environment.apiBaseUrl + "/task";



  constructor(private http: HttpClient) {

  }




  public loadUserTasks(): Observable<TaskModel[]> {
        return this.http.get<TaskModel[]>(this.host + "/user/private");
  }

  loadUserTasksNoEvent(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.host + "/user/private");
  }

  public loadTasksByEvent(eventId: string): Observable<TaskModel[]> {
     return this.http.get<TaskModel[]>(this.host + "/event/" + eventId);
  }

  findTaskById(taskId: string):Observable<TaskModel>  {
    return this.http.get<TaskModel>(this.host + "/find/" + taskId);
  }

  assignUsersToTask(users: PublicUserModel[], taskId: string, eventId: string): Observable<TaskModel> {
    const usernames = users.map(user => user.username); //for now only username is needed.
    return this.http.put<TaskModel>(this.host + "/assign/" + taskId + "/event/" + eventId, usernames);
  }


  public addTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.host + "/add", task);
  }

  public updateTask(task: TaskModel): Observable<TaskModel> {

    return this.http.put<TaskModel>(this.host + "/update/" + task.id, task);
  }

  public deleteTask(taskId: string) {
    return this.http.delete(this.host + "/delete/" + taskId);
  }


  public moveTask(taskId: string, xLocation: number, yLocation: number){
    const coords: number[] = [xLocation, yLocation]
    return this.http.put<TaskModel>(this.host + "/moveTask/" + taskId , coords)
  }

  public taskSetComplete(taskId: string, isComplete: boolean): Observable<TaskModel> {

    return this.http.put<TaskModel>(this.host + "/complete/" + taskId, isComplete);
  }
}
