import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../service/event.service";
import {Subscription} from "rxjs";
import {TaskService} from "../../../service/task.service";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Task} from "../../../model/task";
import {CdkDragEnd} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit, OnDestroy {

  currentEvent: Event | undefined;
  eventId = 0;
  taskId = 0;
  private subscriptions: Subscription[] = [];

  tasks: any = [];
  isTaskViewOpen = false;


  faPlus = faPlus;

  constructor(private eventService: EventService, private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    const routeId = this.route.snapshot.paramMap.get("eventId");
    if (routeId){
      this.eventId = +routeId;
      this.subscriptions.push(
        this.eventService.findEventById(this.eventId).subscribe(response => {
          this.currentEvent = response;
        }),
      )
    }
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadTasks(){
    this.taskService.loadTasksByEvent(this.eventId).subscribe(response => {
      this.tasks = response;
    })
  }

  setViewTask(bool: boolean, taskId:number) {
    this.taskId = taskId;
    this.isTaskViewOpen = bool;
    if(!bool){
      this.loadTasks();
    }

  }

  toggleTaskView(bool: boolean, taskId: number) {
    this.taskId = taskId;
    this.isTaskViewOpen = bool;
    if(!bool){
      this.loadTasks();
    }
  }

  taskDropped(task: Task, dropPoint: CdkDragEnd) {
    task.xLocation = dropPoint.source.getFreeDragPosition().x
    task.yLocation = dropPoint.source.getFreeDragPosition().y
    this.subscriptions.push(this.taskService.moveTask(task).subscribe());
  }



  getTaskLocation(task: Task) {
    return {x: task.xLocation, y: task.yLocation};
  }
}
