import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {Task} from "../../model/task";
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {Subscription} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit, OnDestroy {
  loremIpsum = "Lorem ipsum dolor sit amet, " +
    "consectetur adipiscing elit, sed do eiusmod tempor " +
    "incididunt ut labore et dolore magna aliqua. " +
    "Ut enim ad minim veniam, quis nostrud exercitation " +
    "ullamco laboris nisi ut aliquip ex ea commodo consequat."

  faPlus = faPlus;

  private subscriptions: Subscription[] = [];
  tasks: Task[] = [];

  constructor(public taskService: TaskService) {
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){
    this.subscriptions.push(
      this.taskService.loadTasksFromDB().subscribe(response => {
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

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  addTestTask() {
    const newTask =
      new Task(0,
        new Date("2022-11-11"),
        true,
        "test",
        this.loremIpsum.substring(0, this.getRandomInt(100)),
        this.getRandomInt(500),
        this.getRandomInt(300));
    this.subscriptions.push(this.taskService.addTask(newTask)
        .subscribe(() => {
          this.loadTasks(); //TODO: search for better alternative for subscribe
        }));
  }



  ngOnDestroy(): void {
    this.tasks = [];
    this.subscriptions.forEach((sub => sub.unsubscribe()));
  }



}
