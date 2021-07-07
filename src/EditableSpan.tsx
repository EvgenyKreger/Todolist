import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    onChangeInput:(newTitle:string)=>void

}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState<boolean>(true)
    let [title, setTitle] = useState('')

    let activatedMode = () => {
        setEditMode(false)
        setTitle(props.value)
    }
    let deactivatedMode = () => {
        setEditMode(true)
        props.onChangeInput(title)
    }
    let onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    return editMode
        ? <span onDoubleClick={activatedMode}>{props.value} </span> :
        <input value={title} onChange={onChangeInputHandler} autoFocus onBlur={deactivatedMode}
        />


}