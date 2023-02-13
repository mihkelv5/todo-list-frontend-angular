import {Component, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TaskModel} from "../../../model/task.model";
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {TaskService} from "../../../service/task.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {faPencil, faTrash, faPeopleGroup, faSquare, faUserLock, faUsers} from "@fortawesome/free-solid-svg-icons";
import {faCalendar, faCalendarCheck, faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {EventModel} from "../../../model/event.model";
import {AuthenticationService} from "../../../service/authentication.service";
import {PublicUserModel} from "../../../model/user/publicUser.model";
import {select, Store} from "@ngrx/store";
import * as TasksActions from "../../../ngrx-store/actions/tasks.actions";
import * as UserDataSelectors from "../../../ngrx-store/selectors/user.selector"
import * as EventSelectors from "../../../ngrx-store/selectors/events.selector"
import {PrivateUserModel} from "../../../model/user/privateUser.model";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";

@Component({
  selector: 'task-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
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
  currentUser$: Observable<PrivateUserModel>

  @Input("task") task!: TaskModel;

  currentEvent$: Observable<EventModel | null>;
  eventId: string = "";

    taskPopupWindow: boolean = false;
    assignUsersWindow = false; //opens and closes assign user view
    cdkDragging: boolean = false; //checks if task is dragged or clicked, so it wouldn't open popup if task is dragged
    canCdkDrag = true;
    taskZIndex: number = 0; //brings task in front of others when moved or has popup open

    styles = {"right" : "calc(100% + 10px)", "top" : "0"};//used when checking if task is clicked or dragged


  mousePosition = {
    x: 0,
    y: 0
  };


  constructor(private router: Router, private store: Store<AppStateInterface>) {
    this.currentUser$ = this.store.pipe(select(UserDataSelectors.getUserDataSelector))
    this.currentEvent$ = this.store.select(EventSelectors.getCurrentEventSelector)
  }

      ngOnInit(): void {
        this.findDueDate();
        if(this.task.xLocation < 400){
          this.styles.right = "-410px";
        }
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

  togglePopUp(){ //check if task is being dragged, if not then open or close task popup window upon clicking task.
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

    if(this.task.id) {
      const taskId = this.task.id
      this.store.dispatch(TasksActions.deleteTask({taskId}))
    }
  }

  editTask() {
    if(this.task.eventId != undefined){
      this.router.navigateByUrl("/task/" + this.task.id + "/" + this.task.eventId + "/" + this.task.eventName)
    } else {
      this.router.navigateByUrl("/task/" + this.task.id + "/nan/nan")
    }
  }


  canUserCompleteTask(username: string){
      return this.task.owner.username === username || this.task.assignedUsers.find(user => user.username === username)
  }


    getAssignedUsers():PublicUserModel[] {
        return this.task.assignedUsers
    }
}
