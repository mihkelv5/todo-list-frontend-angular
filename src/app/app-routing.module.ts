import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {TaskViewComponent} from "./components/task/task-view.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent},
  { path: "home", component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: "tasks", component: TaskViewComponent, canActivate: [AuthenticationGuard]},
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],

})
export class AppRoutingModule { }
