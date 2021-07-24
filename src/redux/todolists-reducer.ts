import {filterValues, TypeTodolists} from '../App';
import {v1} from 'uuid';



type REMOVE_TODOLIST_TYPE = {
    type: 'REMOVE_TODOLIST'
    id: string

}
type ADD_TODOLIST_TYPE = {
    type: 'ADD_TODOLIST'
    title: string
}
type CHANGE_TODOLIST_TITLE = {
    type: 'CHANGE_TODOLIST_TITLE'
    id: string
    title: string
}
type CHANGE_TODOLIST_FILTER = {
    type: 'CHANGE_TODOLIST_FILTER'
    id: string
    filter: filterValues
}
type ActionType = REMOVE_TODOLIST_TYPE | ADD_TODOLIST_TYPE | CHANGE_TODOLIST_TITLE | CHANGE_TODOLIST_FILTER

export const todolistsReducer = (state: Array<TypeTodolists>, action: ActionType): Array<TypeTodolists> => {
    let newState;
    switch (action.type) {

        case 'REMOVE_TODOLIST':
            return newState = [...state.filter(tl => tl.id !== action.id)]

        case 'ADD_TODOLIST':
            let newTodolist: TypeTodolists = {
                id: v1(),
                title: action.title,
                filter: 'All'
            }
            return newState = [...state, newTodolist];

        case 'CHANGE_TODOLIST_TITLE':
            newState = [...state]
            let needTodolist = newState.find(tl => tl.id == action.id)
            if (needTodolist) {
                needTodolist.title = action.title
            }
            return newState = [...newState]

        case 'CHANGE_TODOLIST_FILTER':
            newState = [...state]
            let needTodolistFilter = newState.find(tl => tl.id == action.id)
            if (needTodolistFilter) {
                needTodolistFilter.filter = action.filter
            }
            return newState = [...newState]

            throw new Error('I don\'t understand this type')

    }

}

export const RemoveTodolistAC=(TodolistId:string):REMOVE_TODOLIST_TYPE => {
    return{ type: 'REMOVE_TODOLIST',id: TodolistId}
}
export const AddTodolistAC=(title:string):ADD_TODOLIST_TYPE => {
    return{ type:'ADD_TODOLIST' ,title:title}
}
export const ChangeTitleTodolistAC=(title:string , id:string):CHANGE_TODOLIST_TITLE => {
    return{ type:'CHANGE_TODOLIST_TITLE' ,id:id, title:title}
}
export const ChangeFilterTodolistAC=(filter:filterValues , id:string):CHANGE_TODOLIST_FILTER => {
    return{ type:'CHANGE_TODOLIST_FILTER' ,id:id, filter:filter}
}