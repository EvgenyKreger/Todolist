import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
        if (inputTitle.trim() === '') return setError('required field');
        setInputTitle('')
        props.addItem(inputTitle.trim());
        setInputTitle('')
    }
    return <div>
        <input className={error ? 'error' : ''}
               value={inputTitle}
               onChange={onChangeInputHandler}
               onKeyPress={onKeyPressHandler}/>
        <button onClick={onClickAddTask}>+</button>
        <div className={'error-message'}>{error}</div>
    </div>
}
