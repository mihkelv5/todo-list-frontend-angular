import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";
import {EventService} from "../../../service/event.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {EventModel} from "../../../model/event.model";

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit, OnDestroy{


  private subscriptions: Subscription[] = [];
  private userId = 0; //used to find events for specific user
  events: EventModel[] = [];

  constructor(private authService: AuthenticationService, private eventService: EventService, private router: Router) {
  }

  ngOnInit(): void {
    const user = this.authService.getUserFromLocalCache();
    this.userId = user.id;
    this.loadEvents();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.events = [];
    this.userId = 0;
  }



  private loadEvents() {
    this.subscriptions.push(
      this.eventService.loadEventsFromDB(this.userId).subscribe(response => {
        this.events = response;

      })
    )
  }

  clickedOnEvent(eventId: number) {
    this.router.navigateByUrl("/event/" + eventId); //TODO: add guard that checks if event exists.
  }

}
