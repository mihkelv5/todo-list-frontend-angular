import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../../service/task.service";
import {TaskModel} from "../../../model/task.model";
import {Subscription} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../../service/authentication.service";
import {TaskFilterEnum} from "../../../enum/task-filter.enum";
import {Router} from "@angular/router";
import {EventModel} from "../../../model/event.model";

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit, OnDestroy {
  faPlus = faPlus;

  @Input("event") event?: EventModel;

  tasksViewFilter !: TaskFilterEnum;
  private subscriptions: Subscription[] = [];
  tasks: TaskModel[] = [];
  viewTaskComponentOpen = false; //enables or disables task create/edit component
  username = "";

  constructor(private taskService: TaskService, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.event){
      this.loadTasksWithFilter(TaskFilterEnum.BY_EVENT, this.event.id)
    } else {
      const user = this.authenticationService.getUserFromLocalCache()
      this.username = user.username;
      this.loadTasksWithFilter(TaskFilterEnum.ALL_TASKS);
    }
  }

  ngOnDestroy(): void {
    this.tasks = [];
    this.subscriptions.forEach((sub => sub.unsubscribe()));
    this.username = "";
  }

  loadTasksWithFilter(tasksViewFilter: TaskFilterEnum, eventId?: string) {
    this.tasksViewFilter = tasksViewFilter;
    this.loadTasks(eventId);
  }

  loadTasks(eventId?: string){
    switch (this.tasksViewFilter) {
      case TaskFilterEnum.MY_TASKS: {
        this.subscriptions.push(
          this.taskService.loadUserTasksNoEvent().subscribe(response => {
            this.tasks = response;
          }));
        return
      }
      case TaskFilterEnum.ALL_TASKS: {
        this.subscriptions.push(
          this.taskService.loadUserTasks().subscribe(response => {
            this.tasks = response;

          }));
        return
      }
      case TaskFilterEnum.THIS_WEEK: {
        this.tasks = [];
        return;
      }

      case TaskFilterEnum.COMPLETED: {
        this.tasks = [];
        return;
      }
      case TaskFilterEnum.BY_EVENT: {

        if(eventId){
          this.subscriptions.push(
            this.taskService.loadTasksByEvent(eventId).subscribe(response => {
              this.tasks = response;
            })
          )
        }
      }
    }
  }


  createNewTask() {
    this.router.navigateByUrl("/task/new/nan/nan")
  }
}
