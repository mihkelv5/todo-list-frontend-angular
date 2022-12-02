import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TaskService} from "../../../service/task.service";
import {Subscription} from "rxjs";
import {Task} from "../../../model/task";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit, OnDestroy{

  @Input("taskId") taskId!: number;
  @Input("eventId") eventId : number | undefined;
  currentTask: Task | undefined;
  isCloseActive = false; //TODO: confirmation of closing window.
  @Output() closeActive = new EventEmitter<boolean>();

  @Output() createTask = new EventEmitter();
  private subscriptions: Subscription[] = [];
  private userId: number = 1;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    if(this.taskId){
      this.subscriptions.push(
        this.taskService.findTaskById(this.taskId).subscribe(response => {
          this.currentTask = response;
          }));
    }

    setTimeout(() => {
        this.isCloseActive = true;
      }, 100 //so it wouldn't instantly close when initiated
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.currentTask = undefined;
  }

  createNewTask(){
    this.addTestTask();


  }

  closeView() {
    if(this.isCloseActive){
      this.closeActive.emit(false);
    }
  }


  @HostListener('document:keydown.escape', ['$event'])
  public onEscapePressed(){
    this.closeView();
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

    } else {
      if(!task.color) {
        task.color = this.getRandomColor();
      }
      this.subscriptions.push(
        this.taskService.addTask(task, this.eventId).subscribe(() => {
          this.createTask.emit()
          this.closeActive.emit(false);
          }));
    }

  }
  //methods for development

  addTestTask() {
    const newTask =
      new Task(0,
        new Date(),
        this.isCompleteRandom(),
        "test",
        this.getRandomString(50),
        this.getRandomInt(500),
        this.getRandomInt(300),
        this.getRandomColor(),
        this.userId,
        this.eventId);
     //probably should do it smarter

      this.subscriptions.push(this.taskService.addTask(newTask, this.eventId)
        .subscribe(() => {
          this.createTask.emit()
          this.closeActive.emit(false);
        }));


  }

  getRandomString(max: number): string {
    const loremIpsum = "Lorem ipsum dolor sit amet, " +
      "consectetur adipiscing elit, sed do eiusmod tempor " +
      "incididunt ut labore et dolore magna aliqua. " +
      "Ut enim ad minim veniam, quis nostrud exercitation " +
      "ullamco laboris nisi ut aliquip ex ea commodo consequat."
    return loremIpsum.substring(0, this.getRandomInt(max))
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  isCompleteRandom(): boolean {
    return Math.random() > 0.5;
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
