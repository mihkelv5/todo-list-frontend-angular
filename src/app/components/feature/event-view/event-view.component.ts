import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../service/event.service";
import {Subscription} from "rxjs";
import {TaskService} from "../../../service/task.service";
import {Task} from "../../../model/task";
import {Event} from "../../../model/event";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";


@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit, OnDestroy {
  faPenToSquare = faPenToSquare;
  isEventLoaded = false;
  eventId!: number;
  event!: Event;
  subscriptions: Subscription[] = [];
  tasks: Task[] = [];

  constructor(private eventService: EventService, private taskService: TaskService,
              private route: ActivatedRoute, private router: Router) {}


  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get("eventId");
    if (routeId) {
      this.subscriptions.push(
        this.eventService.findEventById(+routeId).subscribe(response => {
          // @ts-ignore
          this.event = response;
          this.isEventLoaded = true;
        })
      )
    }
  }


  ngOnDestroy(): void {
  }


  createTask() {
    this.router.navigateByUrl("/task/new/" + this.event.id)
  }


}
