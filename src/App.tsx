import React, {useState} from 'react';
import {PropsTasksType, Todolist} from './Todolist';
import {v1} from 'uuid';
import './App.css'
import {AddItemForm} from './AddItemForm';

export type filterValues = 'All' | 'Active' | 'Completed'
type TaskStateType = {
    [key: string]: Array<PropsTasksType>
}
type TypeTodolists = {
    id: string
    title: string
    filter: filterValues

}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TypeTodolists>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ])


    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: true}],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Spread', isDone: false},
            {id: v1(), title: 'Book', isDone: false}
        ]

    });


    function changeFilter(value: filterValues, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function deleteTask(id: string, todolistId: string) {

        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        return (
            setTasks({...tasks})
        )
    }

    function addTask(value: string, todolistId: string) {
        let newTask = {id: v1(), title: value, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        return (
            setTasks({...tasks})
        )

    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let status = todolistTasks.find(t => t.id === id)
        if (status) {
            status.isDone = isDone
        }
        return (setTasks({...tasks}))
    }
    function addTodolist(title:string){
        let todolist:TypeTodolists={
            id: v1(),
            title: title,
            filter:'All'
        }
       setTodolists([todolist,...todolists]);
        setTasks({...tasks,[todolist.id]:[]})
    }

    return (
        <div >
            <AddItemForm addItem={addTodolist}/>

            {todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id]
                let forTasks = allTodolistTasks


                if (tl.filter === 'Active') {
                    forTasks = allTodolistTasks.filter(t => !t.isDone)
                }
                if (tl.filter === 'Completed') {
                    forTasks = allTodolistTasks.filter(t => t.isDone)
                }
                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={forTasks}
                    changeFilter={changeFilter}
                    deleteTask={deleteTask}
                    addTask={addTask}
                    filter={tl.filter}
                    changeStatus={changeStatus}
                />
            })
            }
        </div>
    )
}

export default App;
