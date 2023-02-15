
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
import { HomeComponent } from './components/views/home/home.component';
import { UserTasksComponent } from './components/smaller-components/user-tasks/user-tasks.component';
import { LoginComponent } from './components/views/login/login.component';
import { RegisterComponent } from './components/views/register/register.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { EventViewComponent } from './components/views/event-view/event-view.component';
import { TaskComponent } from './components/shared/task/task.component';
import { EditTaskComponent } from './components/views/edit-task/edit-task.component';
import { EditEventComponent } from './components/views/edit-event/edit-event.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { InviteUserComponent } from './components/smaller-components/invite-user/invite-user.component';
import { InviteComponent } from './components/shared/invite/invite.component';
import { AssignUserComponent } from './components/shared/assign-user/assign-user.component';
import {StoreModule} from "@ngrx/store";
import {tasksReducers} from "./ngrx-store/reducers/task.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {TaskEffects} from "./ngrx-store/effects/task.effects";
import {eventsReducers} from "./ngrx-store/reducers/event.reducer";
import {EventEffects} from "./ngrx-store/effects/event.effects";
import {UserEffects} from "./ngrx-store/effects/user.effects";
import {userReducers} from "./ngrx-store/reducers/user.reducers";
import { UserPageComponent } from './components/views/user.page/user.page.component';
import { PublicUserCardComponent } from './components/smaller-components/public.user.card/public.user.card.component';


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
    TaskComponent,
    EditTaskComponent,
    EditEventComponent,
    InviteUserComponent,
    InviteComponent,
    AssignUserComponent,
    UserPageComponent,
    PublicUserCardComponent,
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
    MatNativeDateModule,
    MatSlideToggleModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('userTasks', tasksReducers),
    StoreModule.forFeature('userEvents', eventsReducers),
    StoreModule.forFeature('currentUser', userReducers),
    StoreDevtoolsModule.instrument({maxAge: 15}),
    EffectsModule.forRoot([TaskEffects, EventEffects, UserEffects]),

  ],
  providers: [AuthenticationGuard, TaskService, AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
