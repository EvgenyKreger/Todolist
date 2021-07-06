import React, {ChangeEvent} from 'react';
import {filterValues} from './App';
import {AddItemForm} from './AddItemForm';

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
}

export function Todolist(props: PropsType) {



const onchangeFilterAllHandler=()=>props.changeFilter('All', props.id)
const onchangeFilterActiveHandler=()=>props.changeFilter('Active',props.id)
const onchangeFilterCompletedHandler=()=>props.changeFilter('Completed',props.id)
const addTask=(title:string)=>{
    props.addTask(title,props.id)
}

    return (
        <div className={'todo'}>
            <h1>{props.title}</h1>
           <AddItemForm addItem={addTask}/>

            <ul>
                {props.tasks.map(t =>{
                    const onClickDeleteTask=()=>props.deleteTask(t.id, props.id)
                    const onChangeIsDone=(e:ChangeEvent<HTMLInputElement>)=>props.changeStatus(t.id,e.currentTarget.checked, props.id)
                    return(
                    <li key={t.id} className={t.isDone ? 'opacity' :''}><input  type="checkbox" checked={t.isDone} onChange={onChangeIsDone}/>
                    <span >{t.title}</span>
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
