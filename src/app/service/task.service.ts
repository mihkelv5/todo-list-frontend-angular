import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from '../model/task'
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private host = environment.apiBaseUrl;



  constructor(private http: HttpClient) {

  }




  public loadTasksFromDB(id: number): Observable<Task[]> {
        return this.http.get<Task[]>(this.host + "/task/user/" + id + "/tasks");
  }




  public addTask(task: Task): Observable<Task> {

    return this.http.post<Task>(this.host + "/task/add", task);
  }



  public deleteTask(id: number) {

    return this.http.delete(this.host + "/task/delete/" + id );
  }

  public moveTask(task: Task){
    const coords: number[] = [task.xLocation, task.yLocation]
    return this.http.put<Task>(this.host + "/task/moveTask/" + task.id , coords)
  }




}
