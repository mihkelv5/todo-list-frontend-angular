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
import {PublicUserModel} from "../../../model/publicUser.model";
import {Store} from "@ngrx/store";
import * as TasksActions from "../../../ngrx-store/actions/tasksActions";

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
  currentUser: PublicUserModel;

  @Input("task") task!: TaskModel;
  @Input("event") event!: EventModel | null;
  @Output("refreshTasks") refreshTasksEmitter: EventEmitter<string> = new EventEmitter()
  eventId: string = "";

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

  constructor(private taskService: TaskService, private router: Router, private authService: AuthenticationService, private store: Store) {
    const username = this.authService.getUserFromLocalCache().username
    this.currentUser = new PublicUserModel(username); //hacky solution until I move to RxJS store

  }

  ngOnInit(): void {
    if(this.event){
      this.isInEventView = true;
      this.eventId = this.event.id
    }

    this.findDueDate();
    if(this.task.xLocation < 400){
      this.styles.right = "-410px";
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.currentUser = new PublicUserModel("");
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
      this.taskPopupWindow = false;

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
      const taskId = this.task.id;

      this.store.dispatch(TasksActions.completeTask({taskId, isComplete, eventId: this.eventId}))

    }
  }



  taskDragStarted(){
    this.cdkDragging = true;
    this.taskZIndex = 100;
  }

  taskDropped(task: TaskModel, dropPoint: CdkDragEnd) {
    const xLocation = dropPoint.source.getFreeDragPosition().x
    const yLocation = dropPoint.source.getFreeDragPosition().y
    const taskId: string = task.id || "";
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

    this.store.dispatch(TasksActions.moveTask({taskId, xLocation, yLocation, eventId: this.eventId}))
  }


  getTaskLocation(task: TaskModel) {
    return {x: task.xLocation, y: task.yLocation};
  }

  deleteTask() {
    let eventId = ""
    if(this.event) {
      eventId = this.event.id
    }
    if(this.task.id) {
      const taskId = this.task.id
      this.store.dispatch(TasksActions.deleteTask({taskId, eventId: eventId}))
    }
  }

  editTask() {
    if(this.task.eventId != undefined){
      this.router.navigateByUrl("/task/" + this.task.id + "/" + this.event?.id + "/" + this.task.eventName)
    } else {
      this.router.navigateByUrl("/task/" + this.task.id + "/nan/nan")
    }
  }

  getEventUsers(): PublicUserModel[] {
    if(this.event?.eventUsernames){
      return this.event?.eventUsernames
    }
    return [];
  }

  assignUsersToTask($event: PublicUserModel[]) {
    if($event && this.task.id && this.event){
      this.subscriptions.push(
        this.taskService.assignUsersToTask($event, this.task.id, this.event.id).subscribe((response) => {
          this.task.assignedUsers = response.assignedUsers;
        })
      );
    }
    this.assignUsersWindow = false;
  }

  isUserInTask():boolean {
    if(this.task.assignedUsers){
      //moved from username to just being a string to a public user object.
      return this.currentUser.username == this.task.owner.username || this.task.assignedUsers?.map(user => user.username).includes(this.currentUser.username);
    }
    return false;
  }

}
