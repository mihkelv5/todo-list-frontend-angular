
//modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

//services
import {TaskService} from "./service/task.service";
import { AuthenticationService} from "./service/authentication.service";

//guards
import {AuthenticationGuard} from "./guard/authentication.guard";

//interceptors
import { AuthInterceptor} from "./interceptor/auth.interceptor";

//directives
import {ClickedOutsideDirective} from "./directive/ClickedOutside.directive";

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewTaskComponent } from './components/user-tasks/task-view/view-task.component';
import { EventViewComponent } from './components/user-events/event-view/event-view.component';
import { UserEventsComponent } from './components/user-events/user-events.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserTasksComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ViewTaskComponent,
    ClickedOutsideDirective,
    EventViewComponent,
    UserEventsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule

  ],
  providers: [AuthenticationGuard, TaskService, AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
