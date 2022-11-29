import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {Task} from "../../model/task";
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {Subscription} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../service/authentication.service";
import {TaskFilterEnum} from "../../enum/task-filter.enum";

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit, OnDestroy {
  faPlus = faPlus;

  private subscriptions: Subscription[] = [];
  tasks: Task[] = [];
  userId = 0;
  taskFilter: TaskFilterEnum = TaskFilterEnum.ALL_TASKS;
  viewTaskComponentOpen = false;

  constructor(private taskService: TaskService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loadTasks();
    const user = this.authService.getUserFromLocalCache()
    this.userId = user.id;
  }

  loadTasks(){
    this.subscriptions.push(
      this.taskService.loadTasksFromDB(this.userId).subscribe(response => {
        this.tasks = response;
      }));
  }


  deleteTask(id: number) {
    this.subscriptions.push(
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks();
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






  ngOnDestroy(): void {
    this.tasks = [];
    this.subscriptions.forEach((sub => sub.unsubscribe()));
    this.userId = 0;
  }

  //Temporary methods for development

 addEmptyTask() {

 }

  addTestTask() {
    const newTask =
      new Task(0,
        new Date("2022-11-11"),
        this.isCompleteRandom(),
        "test",
        this.getRandomString(50),
        this.getRandomInt(500),
        this.getRandomInt(300),
        this.getRandomColor(),
        this.userId);
    this.subscriptions.push(this.taskService.addTask(newTask)
        .subscribe(() => {
          this.tasks.push(newTask);
        }));
  }

  getRandomString(max: number): string {
    const loremIpsum = "Lorem ipsum dolor sit amet, " +
      "consectetur adipiscing elit, sed do eiusmod tempor " +
      "incididunt ut labore et dolore magna aliqua. " +
      "Ut enim ad minim veniam, quis nostrud exercitation " +
      "ullamco laboris nisi ut aliquip ex ea commodo consequat."
    return loremIpsum.substring(0, this.getRandomInt(max))
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  isCompleteRandom(): boolean {
    return Math.random() > 0.5;
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }


}
