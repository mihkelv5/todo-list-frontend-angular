import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from '../model/task'
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private host = environment.apiBaseUrl + "/task";



  constructor(private http: HttpClient) {

  }




  public loadUserTasks(id: number): Observable<Task[]> {
        return this.http.get<Task[]>(this.host + "/user/" + id + "/all");
  }

  loadUserTasksNoEvent(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.host + "/user/" + id + "/own");
  }

  public loadTasksByEvent(eventId: number): Observable<Task[]> {
     return this.http.get<Task[]>(this.host + "/event/" + eventId);
  }

  findTaskById(taskId: number):Observable<Task>  {
    return this.http.get<Task>(this.host + "/find/" + taskId);
  }







  public addTask(task: Task, eventId: number | undefined ): Observable<Task> {
    if(eventId){
      return this.http.post<Task>(this.host + "/add/event/" + eventId, task);
    }
    return this.http.post<Task>(this.host + "/add", task);
  }


  public updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.host + "/update/" + task.id, task);
  }

  public deleteTask(id: number) {
    return this.http.delete(this.host + "/delete/" + id);
  }


  public moveTask(task: Task){
    const coords: number[] = [task.xLocation, task.yLocation]
    return this.http.put<Task>(this.host + "/moveTask/" + task.id , coords)
  }
}
