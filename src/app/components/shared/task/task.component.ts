import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Task} from "../../../model/task";
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {TaskService} from "../../../service/task.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'task-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy{
  @Input("task") task!: Task;
  @Input("userId") userId!: number;
  @Input("eventId") eventId: number | undefined
  @Output("refreshTasks") refreshTasksEmitter: EventEmitter<any> = new EventEmitter()

  taskPopupOpen: boolean = false;

  //used when checking if task is clicked or dragged
  mousePosition = {
    x: 0,
    y: 0
  };

  subscriptions: Subscription[] = [];


  constructor(private taskService: TaskService, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  @HostListener('document:keydown.escape', ['$event'])
  closePopUp(){
    this.taskPopupOpen=false;
  }

  togglePopUp(){
    this.taskPopupOpen = !this.taskPopupOpen;
  }
  onMouseDown($event: any) {
    this.mousePosition.x = $event.screenX;
    this.mousePosition.y = $event.screenY;
  }

  onClick($event: any) {
    if (
      this.mousePosition.x === $event.screenX &&
      this.mousePosition.y === $event.screenY
    ) {
      this.togglePopUp();
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

  deleteTask() {
    this.subscriptions.push(
      this.taskService.deleteTask(this.task.id).subscribe(() => {
        this.refreshTasksEmitter.emit();
      }));
  }

  editTask() {
    if(this.task.event_id != undefined){
      this.router.navigateByUrl("/task/" + this.task.id + "/" + this.task.event_id)
    } else {
      this.router.navigateByUrl("/task/" + this.task.id + "/nan")
    }

  }



}
