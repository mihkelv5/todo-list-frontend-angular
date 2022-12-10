import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskModel} from '../model/task.model'
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private host = environment.apiBaseUrl + "/task";



  constructor(private http: HttpClient) {

  }




  public loadUserTasks(username: string): Observable<TaskModel[]> {
        return this.http.get<TaskModel[]>(environment.apiBaseUrl + "/user/" + username + "/task/all");
  }

  loadUserTasksNoEvent(username: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(environment.apiBaseUrl + "/user/" + username + "/task/private");
  }

  public loadTasksByEvent(eventId: number): Observable<TaskModel[]> {
     return this.http.get<TaskModel[]>(this.host + "/event/" + eventId);
  }

  findTaskById(taskId: number):Observable<TaskModel>  {
    return this.http.get<TaskModel>(this.host + "/find/" + taskId);
  }

  assignUsersToTask(usernames: string[], taskId: number) {
    return this.http.put(this.host + "/assign/" + taskId, usernames);
  }





  public addTask(task: TaskModel, eventId: number | undefined ): Observable<TaskModel> {
    if(eventId){
      return this.http.post<TaskModel>(this.host + "/add/event/" + eventId, task);
    }
    return this.http.post<TaskModel>(this.host + "/add", task);
  }


  public updateTask(task: TaskModel): Observable<TaskModel> {
    return this.http.put<TaskModel>(this.host + "/update/" + task.id, task);
  }

  public deleteTask(id: number) {
    return this.http.delete(this.host + "/delete/" + id);
  }


  public moveTask(task: TaskModel){
    const coords: number[] = [task.xLocation, task.yLocation]
    return this.http.put<TaskModel>(this.host + "/moveTask/" + task.id , coords)
  }

  public taskSetComplete(id: number, isComplete: boolean): Observable<TaskModel> {
    return this.http.put<TaskModel>(this.host + "/complete/" + id, isComplete);
  }
}
