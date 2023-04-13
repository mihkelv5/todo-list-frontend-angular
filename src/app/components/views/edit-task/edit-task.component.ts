import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TaskModel} from "../../../model/task.model";
import {Observable, take} from "rxjs";
import { Location } from '@angular/common'
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {Store} from "@ngrx/store";
import * as TaskSelectors from "../../../ngrx-store/selectors/task.selector"
import * as TaskActions from "../../../ngrx-store/actions/task.actions"
import {DateAdapter} from "@angular/material/core";
import * as TagsSelector from "../../../ngrx-store/selectors/tag.selector";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent{



  task$: Observable<TaskModel>
  eventId: string | undefined = undefined;
  availableTags$: Observable<string[] | undefined>
  activeTags: string[] = [];

  constructor(private dateAdapter: DateAdapter<Date>, private route: ActivatedRoute, private location: Location, private store: Store<AppStateInterface>) {

    this.dateAdapter.setLocale('en-GB')
    const taskId = this.route.snapshot.paramMap.get("taskId");
    this.task$ = this.store.select(TaskSelectors.getTaskDetails(taskId))



    const eventId = this.route.snapshot.paramMap.get("eventId");
        if(eventId && eventId != "nan"){
            this.eventId = eventId;
        }
    this.availableTags$ = this.store.select(TagsSelector.getUserOrEventTags(this.eventId))
    this.task$.pipe(take(1)).subscribe(task => {
      this.activeTags = task.tags
    })
  }




  onSubmit(formTask: TaskModel, oldTask: TaskModel, userTags: string[]) {

    if(!oldTask.id){
      if(!formTask.color){
        formTask.color = this.getRandomColor();
      }
      formTask.id = null;
      formTask.eventId = this.eventId;

      this.store.dispatch(TaskActions.addTask({task: formTask}));
      this.location.back();

    }
    else {
      let updatedTask = JSON.parse(JSON.stringify(oldTask)); // JSON so it would not be a reference, but a totally different variable
      if(formTask.title){
        updatedTask.title = formTask.title;
      }
      if(formTask.description){
        updatedTask.description = formTask.description;
      }
      if(formTask.date){
        updatedTask.date = new Date(formTask.date);
      }
      if(formTask.color) {
        if(formTask.color.toLowerCase() === "random"){
          updatedTask.color = this.getRandomColor();
        } else {
          updatedTask.color = formTask.color;
        }
      }
      if(this.activeTags.length > 0){
        this.activeTags = this.activeTags.filter(tag => userTags.includes(tag)); //deletes tags that user has deleted
        updatedTask.tags = this.activeTags.join(", ")
      } else {
        updatedTask.tags = null;
      }

        this.store.dispatch(TaskActions.updateTask({task: updatedTask}));
        this.location.back();
    }
  }

  onCancel() {
    this.location.back();
  }

  OnCheckBoxSelect(tag: string, event:any ) {
    if(event.target.checked){
      this.activeTags = this.activeTags.concat(tag)
    } else {
      this.activeTags = this.activeTags.filter(addedTag => addedTag != tag)
    }
  }


  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
