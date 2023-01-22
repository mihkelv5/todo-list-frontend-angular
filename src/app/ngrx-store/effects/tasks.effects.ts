import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as TasksActions from "../actions/tasks.actions"
import {catchError, concatMap, exhaustMap, map, mergeMap, of} from "rxjs";
import {TaskService} from "../../service/task.service";


@Injectable()
export class TasksEffects {

  constructor(private actions$: Actions, private taskService: TaskService) {}

  getUserTasks$ = createEffect(() =>
  this.actions$.pipe(ofType(TasksActions.getUserTasks),
    exhaustMap(() => {
      return this.taskService.loadUserTasks().pipe(map(
        tasks => TasksActions.getUserTasksSuccess({tasks}),
      ))
    })));

  getEventTasks$ = createEffect(() =>
    this.actions$.pipe(ofType(TasksActions.getEventTasks),
      exhaustMap((action) => {
          console.log(action.eventId)
        return this.taskService.loadTasksByEvent(action.eventId).pipe(map(
            (tasks) => TasksActions.getEventTasksSuccess({eventTasks: tasks})
        ))
      })
      )
  )



  completeTask$ = createEffect(() =>
  this.actions$.pipe(ofType(TasksActions.completeTask),
    concatMap((action) => {
      return this.taskService.taskSetComplete(action.taskId, action.isComplete).pipe(map(
        task => TasksActions.completeTaskSuccess({task, eventId: action.eventId})
      ))
    })));

  moveTask$ = createEffect(() =>
    this.actions$.pipe(ofType(TasksActions.moveTask),
      concatMap((action) => {

        return this.taskService.moveTask(action.taskId, action.xLocation, action.yLocation).pipe(map(
          task => TasksActions.moveTaskSuccess({task, eventId: action.eventId})
        ))
      })));

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(ofType(TasksActions.deleteTask),
      mergeMap( action => {
        return this.taskService.deleteTask(action.taskId).pipe(map(
          () => TasksActions.deleteTaskSuccess({taskId: action.taskId, eventId: action.eventId})
        ))
      })
      ))
}
