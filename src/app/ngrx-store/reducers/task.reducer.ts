import {createReducer, on} from "@ngrx/store";
import {TaskStateInterface} from "../state/TaskStateInterface";
import * as TasksActions from "../actions/task.actions";


export  const initialState: TaskStateInterface = {
  tasks: [],
    userTasksLoaded: false,
    eventIdsThatHaveTasksLoaded: []


}

export const tasksReducers = createReducer(initialState,
  on(TasksActions.getUserTasksSuccess, (state, action) => {
    return {
      ...state,
        userTasksLoaded: true,
      tasks: state.tasks.concat(action.tasks)
    }
  }),

  on(TasksActions.getEventTasksSuccess, (state, action) => {
      return {

      ...state,
          tasks: state.tasks.concat(action.eventTasks),
          eventIdsThatHaveTasksLoaded: state.eventIdsThatHaveTasksLoaded.concat(action.eventId)
    }
  }),


  on(TasksActions.addTaskSuccess, (state, action) => {

      return {
        ...state,
        tasks: state.tasks.concat(action.task)
      }


  }),

  on(TasksActions.completeTaskSuccess, (state, action) => {
    if(!action.task.id){
      return state
    }
    //finds the id of the task that is changed



      const id = state.tasks.findIndex(task => task.id === action.task.id);

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

  }),
  on(TasksActions.moveTask, (state, action) => { //implementing it this way requires store to have moveTaskFailure too, so if moving task fails in DB then updated state will be reversed.
    if(!action.taskId){
      return state
    }

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

  }),

  on(TasksActions.deleteTaskSuccess, (state, action) => {

      return {

        ...state,
        tasks: [...state.tasks.filter(task => task.id !== action.taskId)]
      }

  }),

    on(TasksActions.saveTaskUsersSuccess, (state, action) => {
        const id = state.tasks.findIndex(task => task.id === action.task.id);
        return {
            ...state, //everything else will stay the same
            tasks: //creates new array with:
                [...state.tasks.slice(0, id),
                    {
                        ...state.tasks[id],
                        assignedUsers: action.task.assignedUsers
                    },
                    ...state.tasks.slice(id + 1)]
        }
    })


)
