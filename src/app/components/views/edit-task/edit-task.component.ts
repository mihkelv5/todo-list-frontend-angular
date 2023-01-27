import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TaskModel} from "../../../model/task.model";
import {TaskService} from "../../../service/task.service";
import {map, Observable, of, Subscription} from "rxjs";
import { Location } from '@angular/common'
import {PublicUserModel} from "../../../model/user/publicUser.model";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {select, Store} from "@ngrx/store";
import * as TaskSelectors from "../../../ngrx-store/selectors/tasks.selector"
import * as TaskActions from "../../../ngrx-store/actions/tasks.actions"
import {DateAdapter} from "@angular/material/core";


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent{



  task$: Observable<TaskModel>
    eventId: string = "";

  constructor(private dateAdapter: DateAdapter<Date>, private route: ActivatedRoute, private location: Location, private store: Store<AppStateInterface>) {

      this.dateAdapter.setLocale('en-GB')
      const taskId = this.route.snapshot.paramMap.get("taskId");
      this.task$ = this.store.select(TaskSelectors.getTaskDetails(taskId))

      const eventId = this.route.snapshot.paramMap.get("eventId");
        if(eventId && eventId != "new"){
            this.eventId = eventId;
        }
  }




  onSubmit(formTask: TaskModel, oldTask: TaskModel) {
    if(!oldTask.id){
      if(!formTask.color){
        formTask.color = this.getRandomColor();
      }
      formTask.eventId = this.eventId;
      this.store.dispatch(TaskActions.addTask({task: formTask}));
      this.location.back();

    }
    else {
      const updatedTask = oldTask;
      if(formTask.title){
        updatedTask.title = formTask.title;
      }
      if(formTask.description){
        updatedTask.description = formTask.description;
      }
      if(formTask.date){
        updatedTask.date = formTask.date;
      }
      if(formTask.color) {
        if(formTask.color.toLowerCase() === "random"){
          updatedTask.color = this.getRandomColor();
        } else {
          updatedTask.color = formTask.color;
        }
      }
        this.store.dispatch(TaskActions.addTask({task: updatedTask}));
        this.location.back();
    }
  }

  onCancel() {
    this.location.back();
  }


  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
