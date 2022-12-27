import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TaskModel} from "../../../model/task.model";
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {TaskService} from "../../../service/task.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {faPencil, faTrash, faPeopleGroup, faSquare, faUserLock, faUsers} from "@fortawesome/free-solid-svg-icons";
import {faCalendar, faCalendarCheck, faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {EventModel} from "../../../model/event.model";
import {AuthenticationService} from "../../../service/authentication.service";

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
  dueDateMessage = "";
  currentUser = "";

  @Input("task") task!: TaskModel;
  @Input("event") event?: EventModel;
  @Output("refreshTasks") refreshTasksEmitter: EventEmitter<any> = new EventEmitter()

  taskPopupWindow: boolean = false;
  isInEventView: boolean = false; //assigning users button will only be available if the task is viewed in event page.
  assignUsersWindow = false; //opens and closes assign user view


  //checks if task is dragged or clicked, so it wouldn't open popup if task is dragged
  cdkDragging: boolean = false;
  canCdkDrag = true;

  //brings task in front of others when moved or has popup open
  taskZIndex: number = 0;

  styles = {"right" : "calc(100% + 10px)", "top" : "0"};

  //used when checking if task is clicked or dragged
  mousePosition = {
    x: 0,
    y: 0
  };

  subscriptions: Subscription[] = [];

  constructor(private taskService: TaskService, private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    if(this.event){
      console.log("is in eventview")
      this.isInEventView = true;
    }
    this.currentUser = this.authService.getUserFromLocalCache().username;
    this.findDueDate();
    if(this.task.xLocation < 400){
      this.styles.right = "-410px";
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.currentUser = "";
  }

   findDueDate(){
     const dueDate = new Date(this.task.date).getTime();
     const date = new Date().getTime()
     this.timeUntilDue = Math.floor((dueDate - date) / (1000 * 3600 * 24) + 1)
     //takes 2 timestamps and subtracts one from another to show how many days left for task due date

    switch (true){
      case (this.timeUntilDue > 1): {
        this.dueDateMessage = "Time left: " + this.timeUntilDue + " days";
        break;
      }
      case (this.timeUntilDue == 1): {
        this.dueDateMessage = "Due tomorrow";
        break;
      }
      case (this.timeUntilDue == 0): {
        this.dueDateMessage = "Due today";
        break;
      }
      case (this.timeUntilDue == -1): {
        this.dueDateMessage = "Deadline was yesterday";
        break;
      }
      case (this.timeUntilDue < -1): {
        this.dueDateMessage = "Deadline was " + Math.abs(this.timeUntilDue) + " days ago"
      }

    }
   }

  @HostListener('document:keydown.escape', ['$event'])
  closePopUp(){
    if(!this.assignUsersWindow){
      this.taskZIndex = 0;
      this.taskPopupWindow = false;3

    }
  }

  togglePopUp(){
    if(!this.cdkDragging){
      if(this.taskPopupWindow){
        this.taskPopupWindow = false;
        this.taskZIndex = 0;
        this.assignUsersWindow = false;
      } else {
        this.taskPopupWindow = true;
        this.taskZIndex = 3;

      }
    }
  }

  completeTask(isComplete: boolean) {
    if(this.task.id){
      this.subscriptions.push(
            this.taskService.taskSetComplete(this.task.id, isComplete).subscribe(response => {
              this.task = response;
              this.refreshTasksEmitter.emit();
            })
          )
    }
  }



  taskDragStarted(){
    this.cdkDragging = true;
    this.taskZIndex = 100;
  }

  taskDropped(task: TaskModel, dropPoint: CdkDragEnd) {
    task.xLocation = dropPoint.source.getFreeDragPosition().x
    task.yLocation = dropPoint.source.getFreeDragPosition().y
    this.canCdkDrag = false;
    setTimeout( () => {

      this.canCdkDrag = true;
    },1000)
    if(task.xLocation < 400){
      this.styles.right = "-410px";
    }
    else {
      this.styles.right = "calc(100% + 10px)";
    }
    this.subscriptions.push(this.taskService.moveTask(task).subscribe(() => {
      if(!this.taskPopupWindow){
        this.taskZIndex = 0;
      }
      this.cdkDragging = false
    }));
  }


  getTaskLocation(task: TaskModel) {
    return {x: task.xLocation, y: task.yLocation};
  }

  deleteTask() {
    if(this.task.id) {
      this.subscriptions.push(
        this.taskService.deleteTask(this.task.id).subscribe(() => {
          this.refreshTasksEmitter.emit();
        }));
    }
  }

  editTask() {
    if(this.task.eventId != undefined){
      this.router.navigateByUrl("/task/" + this.task.id + "/" + this.event?.id + "/" + this.task.eventName)
    } else {
      this.router.navigateByUrl("/task/" + this.task.id + "/nan/nan")
    }
  }

  getEventUsers(): string[] {
    if(this.event?.eventUsernames){
      return this.event?.eventUsernames
    }
    return [];
  }

  assignUsersToTask($event: string[]) {
    if($event && this.task.id){
      this.subscriptions.push(
        this.taskService.assignUsersToTask($event, this.task.id).subscribe(() => {
          this.task.assignedUsernames = $event;
        })
      );
    }
    this.assignUsersWindow = false;
  }

  isUserInTask():boolean {
    if(this.task.assignedUsernames){
      return this.currentUser == this.task.ownerUsername || this.task.assignedUsernames?.includes(this.currentUser);
    }
    return false;
  }

  /*import { fromEvent, throttleTime, map, scan } from 'rxjs'; //to stop users from spamming the move

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    map((event) => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  )
  .subscribe((count) => console.log(count));;*/
}
