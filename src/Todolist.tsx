import React, {ChangeEvent} from 'react';
import {filterValues} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type PropsTasksType = {
    id: string
    title: string
    isDone: boolean

}
type PropsType = {
    title: string
    tasks: Array<PropsTasksType>
    changeFilter: (value: filterValues,todolistId:string) => void
    deleteTask: (id: string,todolistId:string) => void
    addTask: (value: string,todolistId:string) => void
    filter:filterValues
    changeStatus:(id:string,isDone:boolean,todolistId:string)=>void
    id:string
    onChangeInputTasks:(id:string,newTitle:string,todolistId:string)=>void
    changeTitleTodolist:(id:string,newTitle:string)=>void
    deleteTodolist:(todolistId:string)=>void
}

export function Todolist(props: PropsType) {



const onchangeFilterAllHandler=()=>props.changeFilter('All', props.id)
const onchangeFilterActiveHandler=()=>props.changeFilter('Active',props.id)
const onchangeFilterCompletedHandler=()=>props.changeFilter('Completed',props.id)
const addTask=(title:string)=>{
    props.addTask(title,props.id)
}
const changeTitleTodolist=(newTitle:string)=>props.changeTitleTodolist(props.id,newTitle)
const  removeTodolists=()=>props.deleteTodolist(props.id)

    return (
        <div className={'todo'}>
            <h1><EditableSpan value={props.title} onChangeInput={changeTitleTodolist} /><button onClick={removeTodolists}> x </button></h1>

           <AddItemForm addItem={addTask}/>

            <ul>
                {props.tasks.map(t =>{
                    const onClickDeleteTask=()=>props.deleteTask(t.id, props.id)
                    const onChangeIsDone=(e:ChangeEvent<HTMLInputElement>)=>props.changeStatus(t.id,e.currentTarget.checked, props.id)

                    const onChangeInput=(newTitle:string)=>props.onChangeInputTasks(t.id,newTitle, props.id)


                    return(
                    <li key={t.id} className={t.isDone ? 'opacity' :''}><input  type="checkbox" checked={t.isDone} onChange={onChangeIsDone}/>

                        <EditableSpan value={t.title} onChangeInput={onChangeInput} />
                    <button onClick={onClickDeleteTask}>X
                    </button>
                </li>)})}

            </ul>
            <div>
                <button className={props.filter==='All' ? 'filter' : ''} onClick={onchangeFilterAllHandler}>All</button>
                <button className={props.filter==='Active' ? 'filter' : ''} onClick={onchangeFilterActiveHandler}>Active</button>
                <button className={props.filter==='Completed' ? 'filter' : ''} onClick={onchangeFilterCompletedHandler}>Completed</button>

            </div>
        </div>
    )

}
