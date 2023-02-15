import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./components/views/login/login.component";
import {RegisterComponent} from "./components/views/register/register.component";
import {HomeComponent} from "./components/views/home/home.component";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {UserTasksComponent} from "./components/smaller-components/user-tasks/user-tasks.component";
import {EventViewComponent} from "./components/views/event-view/event-view.component";
import {EditTaskComponent} from "./components/views/edit-task/edit-task.component";
import {EditEventComponent} from "./components/views/edit-event/edit-event.component";
import {UserPageComponent} from "./components/views/user.page/user.page.component";


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent},
  { path: "home", component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: "tasks", component: UserTasksComponent, canActivate: [AuthenticationGuard]},
  { path: "event/:eventId", component: EventViewComponent, canActivate: [AuthenticationGuard]},
  { path: "task/:taskId/:eventId/:eventName", component: EditTaskComponent, canActivate: [AuthenticationGuard]},
  { path: "event/edit/:eventId", component: EditEventComponent, canActivate: [AuthenticationGuard]},
  { path: "profile/private", component: UserPageComponent, canActivate: [AuthenticationGuard]},
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],

})
export class AppRoutingModule { }
