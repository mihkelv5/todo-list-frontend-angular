import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../../service/task.service";
import {Task} from "../../../model/task";
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {Subscription} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../../service/authentication.service";
import {TaskFilterEnum} from "../../../enum/task-filter.enum";

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit, OnDestroy {
  faPlus = faPlus;

  currentTaskView !: TaskFilterEnum;

  private subscriptions: Subscription[] = [];
  tasks: Task[] = [];
  viewTaskComponentOpen = false; //enables or disables task create/edit component
  userId = 0; //used when getting tasks from user
  taskId = 0; //used when a task view is initialized
  constructor(private taskService: TaskService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    const user = this.authService.getUserFromLocalCache()
    this.userId = user.id;
    this.loadTasks(TaskFilterEnum.ALL_TASKS);
  }

  ngOnDestroy(): void {
    this.tasks = [];
    this.subscriptions.forEach((sub => sub.unsubscribe()));
    this.userId = 0;
  }


  loadTasks(tasksViewFilter: TaskFilterEnum){
    switch (tasksViewFilter) {
      case TaskFilterEnum.MY_TASKS: {
        this.subscriptions.push(
          this.taskService.loadUserTasksNoEvent(this.userId).subscribe(response => {
            this.tasks = response;
          }));
        return
      }
      case TaskFilterEnum.ALL_TASKS: {
        this.subscriptions.push(
          this.taskService.loadUserTasks(this.userId).subscribe(response => {
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
    }


  }

  deleteTask(id: number) {
    this.subscriptions.push(
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks(this.currentTaskView);
      }));
  }

  taskDropped(task: Task, dropPoint: CdkDragEnd) {
    task.xLocation = dropPoint.source.getFreeDragPosition().x
    task.yLocation = dropPoint.source.getFreeDragPosition().y
    this.subscriptions.push(this.taskService.moveTask(task).subscribe());
  }



  getTaskLocation(task: Task) {
    return {x: task.xLocation, y: task.yLocation};
  }


  //when called enables or disables single task view, later will route to separate component
  setViewTask(bool: boolean, taskId:number) {
    this.taskId = taskId;
    this.viewTaskComponentOpen = bool;
    if(!bool){
      this.loadTasks(this.currentTaskView);
    }
  }

}
