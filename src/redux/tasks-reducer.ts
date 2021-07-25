import {TaskStateType, TypeTodolists} from '../App';
import {v1} from 'uuid';


export type REMOVE_TASK_TYPE={
    type:'REMOVE_TASK'
    id:string
    key:string
}

export type ADD_TASK_TYPE={
    type:'ADD_TASK'
    key:string
    title:string

}
type ActionsType = REMOVE_TASK_TYPE | ADD_TASK_TYPE
export const tasksReducer=(state:TaskStateType,action:ActionsType):TaskStateType=>{
   let newState;
    switch (action.type){
        case 'REMOVE_TASK': {
            newState={...state}
            let needTodolist=state[action.key]
            let needTask=needTodolist.filter(t=>t.id!==action.id)
            newState[action.key]=needTask
            return newState
        }
        case 'ADD_TASK':{
            newState={...state}
            const tasks=newState[action.key]
            const newTask={id:v1(),title:action.title,isDone:false}
            newState[action.key]=[newTask,...tasks]
            return newState


        }





        default:
            throw new Error("I don't understand this action type")
    }

}

export const removeTaskAC =(taskId:string,todolistId:string):REMOVE_TASK_TYPE=>{
    return {type:'REMOVE_TASK', id:taskId,key:todolistId}
}

export const addTaskAC =(todolistId:string, newTitle:string):ADD_TASK_TYPE=>{
    return {type:'ADD_TASK', key:todolistId,title:newTitle}
}