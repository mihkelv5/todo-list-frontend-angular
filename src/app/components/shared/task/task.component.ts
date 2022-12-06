import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TaskModel} from "../../../model/task.model";
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {TaskService} from "../../../service/task.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {faPencil, faTrash, faPeopleGroup, faSquare, faUserLock, faUsers} from "@fortawesome/free-solid-svg-icons";
import {faCalendar, faCalendarCheck, faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'task-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy{
  faPencil = faPencil;
  faTrash = faTrash;
  faPeopleGroup = faPeopleGroup;
  faCalendar = faCalendar;
  faCalendarCheck = faCalendarCheck;
  faSquare = faSquare;
  faUserLock = faUserLock;
  faUsers = faUsers;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  timeUntilDue = 0;


  @Input("task") task!: TaskModel;
  @Input("userId") userId!: number;
  @Input("eventId") eventId: number | undefined
  @Output("refreshTasks") refreshTasksEmitter: EventEmitter<any> = new EventEmitter()

  taskPopupOpen: boolean = false;

  //checks if task is dragged or clicked, so it wouldn't open popup if task is dragged
  cdkDragging: boolean = false;

  //brings task in front of others when moved or has popup open
  taskZIndex: number = 0;
  //used when checking if task is clicked or dragged
  mousePosition = {
    x: 0,
    y: 0
  };
  subscriptions: Subscription[] = [];


  constructor(private taskService: TaskService, private router: Router) {
  }

  ngOnInit(): void {
    const dueDate = new Date(this.task.date).getTime();
    const date = new Date().getTime()
    this.timeUntilDue = Math.floor((dueDate - date) / (1000 * 3600 * 24) + 1) //takes 2 timestamps and subtracts one from another
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  @HostListener('document:keydown.escape', ['$event'])
  closePopUp(){
    this.taskZIndex = 0;
    this.taskPopupOpen = false;
  }

  togglePopUp(){
    if(!this.cdkDragging){
      if(this.taskPopupOpen){
        this.taskPopupOpen = false;
        this.taskZIndex = 0;
      } else {
        this.taskPopupOpen = true;
        this.taskZIndex = 999;

      }
    }
  }

  completeTask(isComplete: boolean) {
    this.subscriptions.push(
      this.taskService.taskSetComplete(this.task.id, isComplete).subscribe(response => {
        this.task = response;
        this.refreshTasksEmitter.emit();
      })
    )
  }



  taskDragStarted(){
    this.cdkDragging = true;
    this.taskZIndex = 999;
  }

  taskDropped(task: TaskModel, dropPoint: CdkDragEnd) {
    task.xLocation = dropPoint.source.getFreeDragPosition().x
    task.yLocation = dropPoint.source.getFreeDragPosition().y

    this.subscriptions.push(this.taskService.moveTask(task).subscribe(() => {
      if(!this.taskPopupOpen){
        this.taskZIndex = 0;
      }
      this.cdkDragging = false
    }));
  }


  getTaskLocation(task: TaskModel) {
    return {x: task.xLocation, y: task.yLocation};
  }

  deleteTask() {
    this.subscriptions.push(
      this.taskService.deleteTask(this.task.id).subscribe(() => {
        this.refreshTasksEmitter.emit();
      }));
  }

  editTask() {
    if(this.task.eventId != undefined){
      this.router.navigateByUrl("/task/" + this.task.id + "/" + this.task.eventId + "/" + this.task.eventName)
    } else {
      this.router.navigateByUrl("/task/" + this.task.id + "/nan/nan")
    }
  }

}
