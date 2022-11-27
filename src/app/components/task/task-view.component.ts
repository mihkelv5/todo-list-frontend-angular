import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {Task} from "../../model/task";
import {CdkDragEnd} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  loremIpsum = "Lorem ipsum dolor sit amet, " +
    "consectetur adipiscing elit, sed do eiusmod tempor " +
    "incididunt ut labore et dolore magna aliqua. " +
    "Ut enim ad minim veniam, quis nostrud exercitation " +
    "ullamco laboris nisi ut aliquip ex ea commodo consequat."

  constructor(public taskService: TaskService) {
  }


  ngOnInit(): void {
    this.taskService.loadTasksFromDB();
  }

  loadTasks() {
    this.taskService.loadTasksFromDB();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  taskDropped(task: Task, dropPoint: CdkDragEnd) {
    task.xLocation = dropPoint.source.getFreeDragPosition().x
    task.yLocation = dropPoint.source.getFreeDragPosition().y
    this.taskService.moveTask(task);
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
    this.taskService.addTask(newTask)
      .subscribe(() => this.taskService.loadTasksFromDB());
  }

  testLog(){
    console.log("test");
  }


}
