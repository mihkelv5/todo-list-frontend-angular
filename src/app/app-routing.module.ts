import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {UserTasksComponent} from "./components/user-tasks/user-tasks.component";
import {EventViewComponent} from "./components/user-events/event-view/event-view.component";


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent},
  { path: "home", component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: "tasks", component: UserTasksComponent, canActivate: [AuthenticationGuard]},
  { path: "event/:eventId", component: EventViewComponent, canActivate: [AuthenticationGuard]},
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],

})
export class AppRoutingModule { }
