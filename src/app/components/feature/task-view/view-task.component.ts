import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TaskService} from "../../../service/task.service";
import {Subscription} from "rxjs";
import {Task} from "../../../model/task";
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit, OnDestroy{

  //0 if new task, otherwise existing task
  @Input("taskId") taskId!: number;

  //if is created through event, then has id, if user creates one themselves, then null
  @Input("eventId") eventId : number | undefined;

  //is retrieved from db if parent calls this component
  currentTask: Task | undefined;

  //emits to parent to change the boolean if current component is shown or not
  @Output() closeWindow = new EventEmitter<boolean>();
  @Output() createTask = new EventEmitter();
  private subscriptions: Subscription[] = [];
  private userId: number = 0;

  constructor(private taskService: TaskService, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    if(this.taskId){
      this.subscriptions.push(
        this.taskService.findTaskById(this.taskId).subscribe(response => {
          this.currentTask = response;
          }));
    }

    this.userId = this.authenticationService.getUserFromLocalCache().id;

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.currentTask = undefined;
  }


  //sends "false" to parent to close window
  @HostListener('document:keydown.escape', ['$event'])
  closeView() {
    this.closeWindow.emit(false);
  }


  deleteTask(id: number) {
    this.subscriptions.push(
      this.taskService.deleteTask(id).subscribe(() => {
        this.closeView();
      }));
  }

  cancelForm(taskForm: NgForm) {
    this.closeView();
    taskForm.resetForm();
  }


  onSubmit(task: Task) {
    if(this.currentTask){
      task.id = this.currentTask.id;
      task.xLocation = this.currentTask.xLocation;
      task.yLocation = this.currentTask.yLocation;
      if(!task.color){
        task.color = this.currentTask.color;
      }
      this.subscriptions.push(
        this.taskService.updateTask(task).subscribe(() => {
          this.createTask.emit();
          this.closeWindow.emit();
        }));
    } else {
      if(!task.color) {
        task.color = this.getRandomColor();
      }
      this.subscriptions.push(
        this.taskService.addTask(task, this.eventId).subscribe(() => {
          this.createTask.emit()
          this.closeWindow.emit(false);
          }));
    }
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
