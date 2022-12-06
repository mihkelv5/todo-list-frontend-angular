import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./components/core/login/login.component";
import {RegisterComponent} from "./components/core/register/register.component";
import {HomeComponent} from "./components/core/home/home.component";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {UserTasksComponent} from "./components/shared/user-tasks/user-tasks.component";
import {EventViewComponent} from "./components/feature/event-view/event-view.component";
import {EditTaskComponent} from "./components/feature/edit-task/edit-task.component";
import {EditEventComponent} from "./components/feature/edit-event/edit-event.component";


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent},
  { path: "home", component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: "tasks", component: UserTasksComponent, canActivate: [AuthenticationGuard]},
  { path: "event/:eventId", component: EventViewComponent, canActivate: [AuthenticationGuard]},
  { path: "task/:taskId/:eventId/:eventName", component: EditTaskComponent, canActivate: [AuthenticationGuard]},
  { path: "event/edit/:eventId", component: EditEventComponent, canActivate: [AuthenticationGuard]},
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],

})
export class AppRoutingModule { }
