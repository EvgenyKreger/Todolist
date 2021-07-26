import {TaskStateType, TypeTodolists} from '../App';
import {AddTodolistAC, todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';


test('ids should be equals',()=>{
    const startTaskState:TaskStateType={};
    const startTodolistsState:Array<TypeTodolists>=[];

    const action = AddTodolistAC('New todolist');

    const endTasksState=tasksReducer(startTaskState,action)
    const endTodolistsState=todolistsReducer(startTodolistsState,action)

    const keys = Object.keys(endTasksState);
    const idFromTasks=keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
})