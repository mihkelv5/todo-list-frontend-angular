import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Task} from "../../../model/task";
import {TaskService} from "../../../service/task.service";
import {Subscription} from "rxjs";
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements  OnInit, OnDestroy{


  private eventId: number | undefined;
  task: Task;
  subscription: Subscription | undefined;
  constructor(private route: ActivatedRoute, private location: Location, private taskService: TaskService) {
    this.task = new Task(
      0,
      new Date(),
      false,
      "",
      "",
      0,
      0,
      "white",
      0,
      undefined
    )
  }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get("taskId");
    const eventId = this.route.snapshot.paramMap.get("eventId");
    if(eventId && eventId != "nan") {
      this.eventId = +eventId;
    }

    if (taskId && taskId != "new") { //
      this.subscription =  this.taskService.findTaskById(+taskId).subscribe(response => {
        this.task = response;
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();

  }


  //if task id is 0, then it is a new task, that does not exist in db. Otherwise, updates task and sends it to server.

  onSubmit(task: Task) {
    if(this.task.id == 0){
      if(!task.color){
        task.color = this.getRandomColor();
      }
      this.taskService.addTask(task, this.eventId).subscribe(() => {
        this.location.back();
      });
    }
    else {
      const newTask = this.task;
      if(task.title){
        newTask.title = task.title;
      }
      if(task.description){
        newTask.description = task.description;
      }
      if(task.date){
        newTask.date = task.date;
      }
      if(task.color) {
        newTask.color = task.color;
      }
      this.taskService.updateTask(newTask).subscribe(() => {
        this.location.back();
      });
    }
  }

  onCancel() {
    this.location.back();
  }


  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
