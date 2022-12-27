import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../service/event.service";
import {Subscription} from "rxjs";
import {EventModel} from "../../../model/event.model";
import {Location} from "@angular/common";


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']

})
export class EditEventComponent implements OnInit, OnDestroy{
  private eventId?: number;
  private subscriptions: Subscription[] = [];
  currentEvent: EventModel;



  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router, private location: Location) {
    this.currentEvent = new EventModel(0, "", "");

  }

  ngOnInit(): void {
    this.loadEventData()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadEventData(){
    const eventId = this.route.snapshot.paramMap.get("eventId");
    if(eventId && eventId != "new"){
      this.eventId = +eventId;
      this.subscriptions.push(
        this.eventService.findEventById(+eventId).subscribe(response => {
          this.currentEvent = response;
        }));
    }

  }

  submitData(event: EventModel) {
    if(event.title){
      this.currentEvent.title = event.title;
    }
    if(event.description){
      this.currentEvent.description = event.description;
    }


    if(this.currentEvent.id == 0){

      this.subscriptions.push(
        this.eventService.addEvent(this.currentEvent).subscribe(response => {
          this.router.navigateByUrl("event/" + response.id);
        })
      )
    }
    else {


      this.subscriptions.push(
        this.eventService.updateEvent(this.currentEvent).subscribe(response => {
          this.router.navigateByUrl("event/" + response.id);
        })
      )
    }
  }

  resetForm() {
    this.location.back();
  }
}
