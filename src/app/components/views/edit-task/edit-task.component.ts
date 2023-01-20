import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TaskModel} from "../../../model/task.model";
import {TaskService} from "../../../service/task.service";
import {Subscription} from "rxjs";
import { Location } from '@angular/common'
import {PublicUserModel} from "../../../model/publicUser.model";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements  OnInit, OnDestroy{


  private eventId: string | undefined;
  task: TaskModel;
  subscription: Subscription | undefined;
  constructor(private route: ActivatedRoute, private location: Location, private taskService: TaskService) {
    this.task = new TaskModel(
      null,
      new Date(),
      false,
      "",
      "",
      0,
      0,
      "white",
      new PublicUserModel(""),
      [],
      undefined
    );
  }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get("taskId");
    const eventId = this.route.snapshot.paramMap.get("eventId");
    if(eventId && eventId != "nan") {
      this.eventId = eventId;
    }

    if (taskId && taskId != "new") { //
      this.subscription =  this.taskService.findTaskById(taskId).subscribe(response => {
        this.task = response;
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  onSubmit(formTask: TaskModel) {
    if(!this.task.id){
      if(!formTask.color){
        formTask.color = this.getRandomColor();
      }
      formTask.eventId = this.eventId;
      this.taskService.addTask(formTask).subscribe(() => {
        this.location.back();
      });
    }
    else {
      const updatedTask = this.task;
      if(formTask.title){
        updatedTask.title = formTask.title;
      }
      if(formTask.description){
        updatedTask.description = formTask.description;
      }
      if(formTask.date){
        updatedTask.date = formTask.date;
      }
      if(formTask.color) {
        if(formTask.color.toLowerCase() === "random"){
          updatedTask.color = this.getRandomColor();
        } else {
          updatedTask.color = formTask.color;
        }
      }
      this.taskService.updateTask(updatedTask).subscribe(() => {
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
