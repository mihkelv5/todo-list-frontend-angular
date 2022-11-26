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

  userToken: string = "";
  credentials: string = '{"username" : "foos", "password" : "foos"}';
  tasks: Task[] = [];
  constructor(private http: HttpClient) {

  }

  ngOnInit(){
  }



  public loadTasksFromDB() {
        this.http.get<Task[]>(this.host + "/task/all").subscribe(response => {
          this.tasks = response;
      });
  }




  public addTask(task: Task): Observable<Task> {

    return this.http.post<Task>(this.host + "/task/add", task);
  }



  public deleteTask(id: number) {

    this.http.delete(this.host + "/task/delete/" + id ).subscribe(
      () => {
        this.loadTasksFromDB();
      });
  }

  public moveTask(task: Task){

    this.http.put<Task>(this.host + "/task/moveTask",task).subscribe()
  }




}
