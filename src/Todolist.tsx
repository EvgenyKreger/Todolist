import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValues} from './App';

type PropsTasksType = {
    id: string
    title: string
    isDone: boolean

}
type PropsType = {
    title: string
    tasks: Array<PropsTasksType>
    changeFilter: (value: filterValues) => void
    deleteTask: (id: string) => void
    addTask: (value: string) => void
    filter:filterValues
    changeStatus:(id:string,isDone:boolean)=>void
}

export function Todolist(props: PropsType) {
    let [inputTitle, setInputTitle] = useState('')
    let [error, setError] = useState('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    const onClickAddTask = () => {
        if (inputTitle.trim() === '') return setError('required field');
        setInputTitle('')
        props.addTask(inputTitle.trim());
        setInputTitle('')
    }


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.charCode === 13) {
            if (inputTitle.trim() === '') return setError('required field');
            setInputTitle('')
            props.addTask(inputTitle.trim());
            setInputTitle('')
        }
    }

const onchangeFilterAllHandler=()=>props.changeFilter('All')
const onchangeFilterActiveHandler=()=>props.changeFilter('Active')
const onchangeFilterCompletedHandler=()=>props.changeFilter('Completed')


    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input className={error ? 'error' : ''} value={inputTitle} onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickAddTask}>+</button>
            </div>
            <div className={'error-message'}>{error}</div>
            <ul>
                {props.tasks.map(t =>{
                    const onClickDeleteTask=()=>props.deleteTask(t.id)
                    const onChangeIsDone=(e:ChangeEvent<HTMLInputElement>)=>props.changeStatus(t.id,e.currentTarget.checked)
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