import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {ADD_TODOLIST_TYPE, REMOVE_TODOLIST_TYPE} from './todolists-reducer';


export type REMOVE_TASK_TYPE = {
    type: 'REMOVE_TASK'
    id: string
    key: string
}

export type ADD_TASK_TYPE = {
    type: 'ADD_TASK'
    key: string
    title: string
}
export type CHANGE_TASK_STATUS_TYPE = {
    type: 'CHANGE_STATUS'
    key: string
    id: string
    status: boolean
}
export type CHANGE_TASK_TITLE_TYPE = {
    type: 'CHANGE_TITLE'
    key: string
    id: string
    title: string
}

type ActionsType = REMOVE_TASK_TYPE | ADD_TASK_TYPE | CHANGE_TASK_STATUS_TYPE | CHANGE_TASK_TITLE_TYPE
        | ADD_TODOLIST_TYPE | REMOVE_TODOLIST_TYPE
export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {

    switch (action.type) {
        case 'REMOVE_TASK': {
            const newState = {...state}
            let needTodolist = state[action.key]
            newState[action.key] = needTodolist.filter(t => t.id !== action.id)
            return newState
        }
        case 'ADD_TASK': {
            const newState = {...state}
            const tasks = newState[action.key]
            const newTask = {id: v1(), title: action.title, isDone: false}
            newState[action.key] = [newTask, ...tasks]
            return newState
        }
        case 'CHANGE_STATUS': {
            const newState = {...state}
            let tasks = newState[action.key]
            const findTask = tasks.find(t => t.id === action.id)
            if (findTask)
                findTask.isDone = action.status
            newState[action.key] = [...tasks]
            return newState
        }
        case 'CHANGE_TITLE': {
            const newState = {...state}
            const tasks = newState[action.key]
            const findTask = tasks.find(t => t.id === action.id)
            if (findTask)
                findTask.title = action.title
            newState[action.key] = [...tasks]
            return newState
        }

        case 'ADD_TODOLIST':{
            const newState = {...state}
            newState[action.id]=[];
            return newState
        }
        case 'REMOVE_TODOLIST':
            let newState={...state}
            delete newState[action.id]
            return newState
        default:
            throw new Error('I don\'t understand this action type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): REMOVE_TASK_TYPE => {
    return {type: 'REMOVE_TASK', id: taskId, key: todolistId}
}

export const addTaskAC = (todolistId: string, newTitle: string): ADD_TASK_TYPE => {
    return {type: 'ADD_TASK', key: todolistId, title: newTitle}
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, taskStatus: boolean): CHANGE_TASK_STATUS_TYPE => {
    return {type: 'CHANGE_STATUS', id: taskId, key: todolistId, status: taskStatus}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string): CHANGE_TASK_TITLE_TYPE => {
    return {type: 'CHANGE_TITLE', id: taskId, key: todolistId, title: newTitle}
}
