import {UsersStateInterface} from "../state/usersStateInterface";
import {createReducer, on} from "@ngrx/store";
import {TasksStateInterface} from "../state/TasksStateInterface";
import * as TasksActions from "../actions/tasks.actions";


export  const initialState: TasksStateInterface = {
  tasks: [],
  eventTasks: [],

}

export const tasksReducers = createReducer(initialState,
  on(TasksActions.getUserTasksSuccess, (state, action) => {
    return {
      ...state,
      tasks: action.tasks,
    }
  }),

  on(TasksActions.getEventTasksSuccess, (state, action) => {
    console.log(action.eventTasks)
      return {

      ...state,
      eventTasks: action.eventTasks
    }
  }),


  on(TasksActions.addTaskSuccess, (state, action) => {
    if(action.eventId !== ""){
      return {
        ...state,
        eventTasks: [...state.tasks, action.task]
      }
    } else {
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      }
    }

  }),
  on(TasksActions.completeTaskSuccess, (state, action) => {
    if(!action.task.id){
      return state
    }
    //finds the id of the task that is changed


    if(action.eventId !== ""){
      const id = state.eventTasks.findIndex(task => task.id === action.task.id);
      //console.log(action.eventId)
      console.log(id)
      return {
        ...state, //everything else will stay the same
        eventTasks: //creates new array with:
          [...state.eventTasks.slice(0, id), //every task until the task we change
            {
              ...state.eventTasks[id],
              complete: action.task.complete //changes the value of the task
            },
            ...state.eventTasks.slice(id + 1)] //every task after the task we change
      }
    } else {
      const id = state.tasks.findIndex(task => task.id === action.task.id);
      console.log(id)
      return {
        ...state, //everything else will stay the same
        tasks: //creates new array with:
          [...state.tasks.slice(0, id), //every task until the task we change
            {
              ...state.tasks[id],
              complete: action.task.complete //changes the value of the task
            },
            ...state.tasks.slice(id + 1)] //every task after the task we change
      }
    }


  }),
  on(TasksActions.moveTask, (state, action) => { //implementing it this way requires store to have moveTaskFailure too, so if moving task fails in DB then updated state will be reversed.
    if(!action.taskId){
      return state
    }
    if(action.eventId !== ""){
      const id = state.eventTasks.findIndex(task => task.id === action.taskId);
      return {
        ...state, //everything else will stay the same
        eventTasks: //creates new array with:
          [...state.eventTasks.slice(0, id),
            {
              ...state.eventTasks[id],
              xLocation: action.xLocation,
              yLocation: action.yLocation
            },
            ...state.eventTasks.slice(id + 1)]
      }
    } else {
    //finds the id of the task that is changed
      const id = state.tasks.findIndex(task => task.id === action.taskId);
      return {
        ...state, //everything else will stay the same
        tasks: //creates new array with:
          [...state.tasks.slice(0, id),
            {
              ...state.tasks[id],
              xLocation: action.xLocation,
              yLocation: action.yLocation
            },
            ...state.tasks.slice(id + 1)]
      }
    }

  }),

  on(TasksActions.deleteTaskSuccess, (state, action) => {
    if(action.eventId !== ""){
      return {

        ...state,
        eventTasks: [...state.eventTasks.filter(task => task.id !== action.taskId)]
      }
    } else {
      return {

        ...state,
        tasks: [...state.tasks.filter(task => task.id !== action.taskId)]
      }
    }
  }),


)
