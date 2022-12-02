import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../service/event.service";
import {Subscription} from "rxjs";
import {TaskService} from "../../../service/task.service";

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
}
