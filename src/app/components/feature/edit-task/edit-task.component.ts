import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Task} from "../../../model/task";
import {TaskService} from "../../../service/task.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements  OnInit, OnDestroy{

  private eventId: number | undefined;
  task: Task;
  subscription: Subscription | undefined;
  constructor(private route: ActivatedRoute, private taskService: TaskService) {
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
    if (taskId && taskId != "new") { //
      this.subscription =  this.taskService.findTaskById(+taskId).subscribe(response => {
        this.task = response;

      })
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();

  }

  onSubmit(task: Task) {
    if(task.id == 0){
      this.taskService.addTask(task, task.event_id).subscribe();
    }
    else {
      const newTask = this.task;
      newTask.title = task.title;
      newTask.description = task.description;
      newTask.date = task.date;
      if(task.color) {
        newTask.color = task.color;
      }
      console.log("task id:" + this.task.id)
      this.taskService.updateTask(newTask).subscribe();
    }

  }
}
