import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../service/event.service";
import {Observable, of} from "rxjs";
import {EventModel} from "../../../model/event.model";
import {Location} from "@angular/common";
import {AppStateInterface} from "../../../ngrx-store/state/appState.interface";
import {Store} from "@ngrx/store";
import * as EventSelectors from "../../../ngrx-store/selectors/event.selector"
import * as EventActions from "../../../ngrx-store/actions/event.actions";


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']

})
export class EditEventComponent {


    currentEvent$: Observable<EventModel | null>


  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private store: Store<AppStateInterface>) {
    const eventId = this.route.snapshot.paramMap.get("eventId");
    if(eventId && eventId != "new"){
        this.currentEvent$ = this.store.select(EventSelectors.getCurrentEventSelector)
    } else {
        this.currentEvent$ = of(new EventModel("", "", "", ""));
    }
  }



  submitData(event: EventModel, currentEvent: EventModel) {
        let updatedEvent = JSON.parse(JSON.stringify(currentEvent))
    if(event.title){
        updatedEvent.title = event.title;
    }
    if(event.description){
        updatedEvent.description = event.description;
    }


    if(currentEvent.id == ""){
        this.store.dispatch(EventActions.addEvent({event: updatedEvent}))
        this.location.back();

    }
    else {
        this.store.dispatch(EventActions.editEvent({event: updatedEvent}))
        this.location.back();

    }
  }

  resetForm() {
    this.location.back();
  }
}
