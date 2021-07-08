import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {
    let [inputTitle, setInputTitle] = useState('')
    let [error, setError] = useState('')
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.charCode === 13) {
            if (inputTitle.trim() === '') return setError('required field');
            setInputTitle('')
            props.addItem(inputTitle.trim());
            setInputTitle('')
        }
    }
    const onClickAddTask = () => {
        if (inputTitle.trim() === '') return setError('Title is required');
        setInputTitle('')
        props.addItem(inputTitle.trim());
        setInputTitle('')
    }
    return <div>
        <TextField variant={'outlined'} size={'small'}
                   label={'Title'}
                   helperText={error}
                   error={!!error}
                   value={inputTitle}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressHandler}
        />


        {/*// <input className={error ? 'error' : ''}*/}
        {/*//        value={inputTitle}*/}
        {/*//        onChange={onChangeInputHandler}*/}
        {/*//        onKeyPress={onKeyPressHandler}/>*/}
        {/*<Button variant="contained" color="primary" size="large" onClick={onClickAddTask}>+</Button>*/}
        <IconButton color={'primary'} size={'small'} onClick={onClickAddTask}>
            <AddBox/>
        </IconButton>



        {/*<button onClick={onClickAddTask}>+</button>*/}

        {/*<div className={'error-message'}>{error}</div> заменяем на helperText={error}*/}
    </div>
}
