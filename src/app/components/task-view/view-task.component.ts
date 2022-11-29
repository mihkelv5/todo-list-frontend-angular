import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-view-task',
  templateUrl: './view.task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit, OnDestroy{

  @Input("taskId") taskId!: number;
  isCloseActive = false; //TODO: confirmation of closing window.
  @Output() closeActive = new EventEmitter<boolean>();
  @Output() createTask = new EventEmitter();

  private subscriptions: Subscription[] = [];

  constructor(private taskService: TaskService) {
  }

  createNewTask(){
    this.createTask.emit();
    this.closeActive.emit(false);
  }

  closeView() {
    if(this.isCloseActive){
      this.closeActive.emit(false);
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isCloseActive = true;
      }, 100 //so it wouldn't instantly close when initiated
    )
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
