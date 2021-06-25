import React, {useState} from 'react';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import './App.css'
export type filterValues='All'|'Active'|'Completed'

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "HTML", isDone: true},
    ])

    let [filter, setFilter] = useState<filterValues>('All')
    let forTasks = tasks
    if (filter === 'Active') {
        forTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'Completed') {
        forTasks = tasks.filter(t => t.isDone)
    }

    function changeFilter(value: filterValues) {
        setFilter(value)
    }

    function deleteTask(id: string) {
        let delTask = tasks.filter(t => t.id !== id)
        return (
            setTasks(delTask)
        )
    }

    function addTask(value:string) {
        let newTask = {id: v1(), title:value, isDone: false}
        return (
            setTasks([newTask, ...tasks])
        )

    }
function changeStatus(id:string,isDone:boolean){
        const status=tasks.find(t=>t.id===id)
    if(status){
        status.isDone=isDone
    }
    return(setTasks([...tasks]))
}
    return (
        <div>
            <Todolist title={'What to learn'} tasks={forTasks}
                      changeFilter={changeFilter} deleteTask={deleteTask}
                      addTask={addTask} filter={filter} changeStatus={changeStatus}
            />

        </div>
    )
}

export default App;
