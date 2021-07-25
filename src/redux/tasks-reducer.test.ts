
import {addTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TaskStateType} from '../App';


test('correct task should be deleted from correct array ',()=>{

    const startState:TaskStateType={
        "todolist1":[
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: true}
        ],
        "todolist2":[
        {id: '1', title: 'Bread', isDone: true},
        {id: '2', title: 'Milk', isDone: true},
        {id: '3', title: 'Spread', isDone: false},
        {id: '4', title: 'Book', isDone: false}
        ]
    };
    const action = removeTaskAC('2','todolist2');
    const endState=tasksReducer(startState,action)
    expect(endState).toEqual({
        "todolist1":[
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: true}
        ],
        "todolist2":[
            {id: '1', title: 'Bread', isDone: true},
            {id: '3', title: 'Spread', isDone: false},
            {id: '4', title: 'Book', isDone: false}
        ]
    })
});

test('correct task should be added to correct array ',()=>{

    const startState:TaskStateType={
        "todolist1":[
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: true}
        ],
        "todolist2":[
            {id: '1', title: 'Bread', isDone: true},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Spread', isDone: false},
            {id: '4', title: 'Book', isDone: false}
        ]
    };
    const action = addTaskAC('todolist2','juice');
    const endState=tasksReducer(startState,action)

    expect(endState["todolist1"].length).toBe(4)
    expect((endState["todolist2"].length)).toBe(5)
    expect(endState["todolist2"][0].id).toBeDefined()
    expect(endState["todolist2"][0].title).toBe('juice')
    expect(endState["todolist2"][0].isDone).toBe(false)
});

test('status of specified task should be changed',()=>{

    const startState:TaskStateType={
        "todolist1":[
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: true}
        ],
        "todolist2":[
            {id: '1', title: 'Bread', isDone: true},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Spread', isDone: false},
            {id: '4', title: 'Book', isDone: false}
        ]
    };
    const action = changeStatusTaskAC('2',false,'todolist2');
    const endState=tasksReducer(startState,action)

    expect(endState["todolist2"][1].id).toBe(2)
    expect(endState["todolist2"][1].isDone).toBe(false)
    expect(endState["todolist1"][1].id).toBe(2)
    expect(endState["todolist2"][1].isDone).toBe(true)


});

test('title of specified task should be changed',()=>{

    const startState:TaskStateType={
        "todolist1":[
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: true}
        ],
        "todolist2":[
            {id: '1', title: 'Bread', isDone: true},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Spread', isDone: false},
            {id: '4', title: 'Book', isDone: false}
        ]
    };
    const newTestTitle='Phyton'
    const action = changeStatusTaskAC('1',newTestTitle,'todolist1');
    const endState=tasksReducer(startState,action);



    expect(endState["todolist1"][1].id).toBe(1)
    expect(endState["todolist1"][1].title).toBe(newTestTitle)
    expect(endState["todolist2"][1].id).toBe(1)
    expect(endState["todolist2"][1].title).toBe('Bread')


});