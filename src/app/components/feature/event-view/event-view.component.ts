import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../service/event.service";
import {Subscription} from "rxjs";
import {TaskService} from "../../../service/task.service";
import {TaskModel} from "../../../model/task.model";
import {EventModel} from "../../../model/event.model";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {faPencil, faUsers} from "@fortawesome/free-solid-svg-icons";
import {InviteService} from "../../../service/invite.service";



@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit, OnDestroy {
  faPenToSquare = faPenToSquare;
  faPencil = faPencil;
  faUsers = faUsers;
  faTrashCan = faTrashCan;
  openParticipatorsWindow = false;


  isEventLoaded = false;
  eventId!: number;
  event!: EventModel;
  subscriptions: Subscription[] = [];
  tasks: TaskModel[] = [];
  deleteEventConfirmation = false;

  constructor(private eventService: EventService, private taskService: TaskService,
              private route: ActivatedRoute, private router: Router,
              private inviteService: InviteService) {}


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
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }


  createTask() {
    this.router.navigateByUrl("/task/new/" + this.event.id + "/" + this.event.title)
  }


  editEvent() {
    this.router.navigateByUrl("/event/edit/" + this.event.id)
  }

  deleteEvent() {
    this.subscriptions.push(
      this.eventService.deleteEvent(this.event.id).subscribe(() => {
        this.deleteEventConfirmation = false;
        this.router.navigateByUrl("/home");
        //TODO: add toggle to ask if all tasks should be deleted with it too.
      }));
  }

  toggleDeleteEventConfirmation(bool: boolean){
    this.deleteEventConfirmation = bool;
  }

  toggleParticipatorWindow(bool: boolean) {
    this.openParticipatorsWindow = bool;
  }

  inviteUsers($event: string[]) {
    if($event.length != 0){
      $event.forEach(username => {
        this.subscriptions.push(
          this.inviteService.inviteUserToEvent(this.event.id, username).subscribe(response => {
            console.log(response);
            //TODO: confirmation notification
          })
        )
      })
    }
    this.openParticipatorsWindow = false;
  }
}
