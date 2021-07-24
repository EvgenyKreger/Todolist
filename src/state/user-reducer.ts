type StateType = {
    age: number
    childrenCount: number
    name: string
}
type INCREMENT_AGE={
    type: string
    [key: string]: any
}
type INCREMENT_CHILDREN_COUNT={
    type: string
    [key: string]: any
}

type CHANGE_NAME ={
    type: string
    newName:string
    [key: string]: any
}
type ActionType =INCREMENT_AGE | INCREMENT_CHILDREN_COUNT | CHANGE_NAME

export const useReducer = (state: StateType, action: ActionType) => {
   let newState;
    switch (action.type) {
        case 'INCREMENT-AGE':
            newState={...state}
            newState.age = state.age + 1;
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            newState={...state}
            newState.childrenCount=state.childrenCount+1;
            return newState;
        case 'CHANGE-NAME':
            newState={...state};
            newState.name = action.newName
            return newState
            default:
            throw new Error("I don't understand this type");


    }
}