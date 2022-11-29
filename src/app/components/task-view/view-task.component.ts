import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskService} from "../../service/task.service";

@Component({
  selector: 'app-view-task',
  templateUrl: './view.task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit{

  @Input("taskId") taskId!: number;
  isCloseActive = false; //TODO: confirmation of closing window.
  @Output() onHide = new EventEmitter<boolean>();

  constructor(private taskService: TaskService) {
  }

  closeView() {
    if(this.isCloseActive){
      this.onHide.emit(false);
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isCloseActive = true;
      }, 100 //so it wouldn't instantly close when initiated
    )



  }


}
