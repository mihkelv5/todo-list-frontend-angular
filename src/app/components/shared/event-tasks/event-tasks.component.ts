import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../../service/task.service";
import {TaskModel} from "../../../model/task.model";
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {Subscription} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-event-tasks',
  templateUrl: './event-tasks.component.html',
  styleUrls: ['./event-tasks.component.css']
})
export class EventTasksComponent implements OnInit, OnDestroy {
  faPlus = faPlus;


  private subscriptions: Subscription[] = [];
  tasks: TaskModel[] = [];


  @Input("eventId") eventId!: number;
  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.subscriptions.push(
      this.taskService.loadTasksByEvent(this.eventId).subscribe(response => {
        this.tasks = response;
        this.tasks.forEach(task => task.eventId = this.eventId)
      })
    )
  }

  ngOnDestroy(): void {
    this.tasks = [];
    this.subscriptions.forEach((sub => sub.unsubscribe()));

  }

  taskDropped(task: TaskModel, dropPoint: CdkDragEnd) {
    task.xLocation = dropPoint.source.getFreeDragPosition().x
    task.yLocation = dropPoint.source.getFreeDragPosition().y
    this.subscriptions.push(this.taskService.moveTask(task).subscribe());
  }

  getTaskLocation(task: TaskModel) {
    return {x: task.xLocation, y: task.yLocation};
  }

}
