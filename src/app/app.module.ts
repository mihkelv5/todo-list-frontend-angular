
//modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule} from "@angular/material/input";
import { MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule} from "@angular/material/core";

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
import { HomeComponent } from './components/core/home/home.component';
import { UserTasksComponent } from './components/shared/user-tasks/user-tasks.component';
import { LoginComponent } from './components/core/login/login.component';
import { RegisterComponent } from './components/core/register/register.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { EventViewComponent } from './components/feature/event-view/event-view.component';
import { UserEventsComponent } from './components/shared/user-events/user-events.component';
import { TaskComponent } from './components/shared/task/task.component';
import { EditTaskComponent } from './components/feature/edit-task/edit-task.component';
import { EventTasksComponent } from "./components/shared/event-tasks/event-tasks.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserTasksComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ClickedOutsideDirective,
    EventViewComponent,
    UserEventsComponent,
    TaskComponent,
    EditTaskComponent,
    EventTasksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [AuthenticationGuard, TaskService, AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
