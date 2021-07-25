import {v1} from 'uuid';
import {filterValues, TypeTodolists} from '../App';
import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer';


test('correct todolist should be removed',()=>{
    let TodolistId_1 =v1();
    let TodolistId_2 =v1();

    const startState:Array<TypeTodolists> =[
        {id:TodolistId_1, title:'What to learn', filter:'All'},
        {id:TodolistId_2, title:'What to buy', filter:'All'},
    ]
    const endState = todolistsReducer(startState,RemoveTodolistAC(TodolistId_1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(TodolistId_2);
})



test('correct todolist should be added',()=>{
    let TodolistId_1 =v1();
    let TodolistId_2 =v1();
    let newTodolistTitle="New Todolist";

    const startState:Array<TypeTodolists> =[
        {id:TodolistId_1, title:'What to learn', filter:'All'},
        {id:TodolistId_2, title:'What to buy', filter:'All'},
    ]
    const endState = todolistsReducer(startState,AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('All')
})
test('correct todolist should change title',()=>{
    let TodolistId_1 =v1();
    let TodolistId_2 =v1();
    let newChangeTodolistTitle='Title is change';

    const startState:Array<TypeTodolists> =[
        {id:TodolistId_1, title:'What to learn', filter:'All'},
        {id:TodolistId_2, title:'What to buy', filter:'All'},
    ]
    const endState=todolistsReducer (startState,ChangeTitleTodolistAC(newChangeTodolistTitle,TodolistId_2))

    expect(endState[1].title).toBe(newChangeTodolistTitle);
    expect(endState[0].title).toBe('What to learn');
})
test ('correct todolist change filter',()=>{
    let TodolistId_1 =v1();
    let TodolistId_2 =v1();
    let newFilter:filterValues='Completed';


    const startState:Array<TypeTodolists> =[
        {id:TodolistId_1, title:'What to learn', filter:'All'},
        {id:TodolistId_2, title:'What to buy', filter:'All'}
    ]
    const endtState= todolistsReducer(startState,ChangeFilterTodolistAC(newFilter,TodolistId_1))

    expect(endtState[0].filter).toBe('Completed');
    expect(endtState[1].filter).toBe('All')
})