import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";
import {EventService} from "../../../service/event.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {EventModel} from "../../../model/event.model";
import {faImage} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit, OnDestroy{

  faImage=faImage;

  private subscriptions: Subscription[] = [];
  private username = ""; //used to find events for specific user
  events: EventModel[] = [];

  constructor(private authService: AuthenticationService, private eventService: EventService, private router: Router) {
  }

  ngOnInit(): void {
    const user = this.authService.getUserFromLocalCache();
    this.username = user.username;
    this.loadEvents();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.events = [];
    this.username = "";
  }



  private loadEvents() {
    this.subscriptions.push(
      this.eventService.loadEventsFromDB(this.username).subscribe(response => {
        this.events = response;
      })
    )
  }

  clickedOnEvent(eventId: number) {
    this.router.navigateByUrl("/event/" + eventId); //TODO: add guard that checks if event exists.
  }

}
