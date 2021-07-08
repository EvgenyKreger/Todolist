import React, {ChangeEvent} from 'react';
import {filterValues} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

export type PropsTasksType = {
    id: string
    title: string
    isDone: boolean

}
type PropsType = {
    title: string
    tasks: Array<PropsTasksType>
    changeFilter: (value: filterValues, todolistId: string) => void
    deleteTask: (id: string, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    filter: filterValues
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    id: string
    onChangeInputTasks: (id: string, newTitle: string, todolistId: string) => void
    changeTitleTodolist: (id: string, newTitle: string) => void
    deleteTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {


    const onchangeFilterAllHandler = () => props.changeFilter('All', props.id)
    const onchangeFilterActiveHandler = () => props.changeFilter('Active', props.id)
    const onchangeFilterCompletedHandler = () => props.changeFilter('Completed', props.id)
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTitleTodolist = (newTitle: string) => props.changeTitleTodolist(props.id, newTitle)
    const removeTodolists = () => props.deleteTodolist(props.id)

    return (
        <div className={'todo'}>
            <h1><EditableSpan value={props.title} onChangeInput={changeTitleTodolist}/>
                {/*<button onClick={removeTodolists}> x </button>*/}
                <IconButton onClick={removeTodolists} color="primary" size="medium">
                    <Delete/>
                </IconButton>


            </h1>

            <AddItemForm addItem={addTask}/>

            <ul>
                {props.tasks.map(t => {
                    const onClickDeleteTask = () => props.deleteTask(t.id, props.id)
                    const onChangeIsDone = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)

                    const onChangeInput = (newTitle: string) => props.onChangeInputTasks(t.id, newTitle, props.id)


                    return (
                        <li key={t.id} className={t.isDone ? 'opacity' : ''}>

                            <Checkbox color={'primary'} checked={t.isDone} onChange={onChangeIsDone}/>
                            {/*<input type="checkbox" checked={t.isDone} onChange={onChangeIsDone}/>*/}

                            <EditableSpan value={t.title} onChangeInput={onChangeInput}/>
                            <IconButton onClick={onClickDeleteTask}>
                                <Delete/>
                            </IconButton>
                            {/*<button onClick={onClickDeleteTask}>X</button>*/}
                        </li>)
                })}

            </ul>
            <div>
                <Button
                        variant={props.filter === 'All' ? 'contained':'text'}
                        onClick={onchangeFilterAllHandler}
                        color={'primary'}
                      >All
                </Button>

                <Button
                        variant={props.filter === 'Active' ? 'contained':'text'}
                        onClick={onchangeFilterActiveHandler}
                        color={'primary'}

                >Active
                </Button>
                <Button
                    variant={props.filter === 'Completed' ? 'contained':'text'}
                        onClick={onchangeFilterCompletedHandler}
                        color={'primary'}
                >Completed
                </Button>

            </div>
        </div>
    )

}
