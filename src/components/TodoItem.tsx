import React from 'react';
import {StateProps} from "./Todo";

const style = {
    marginTop : '5px',
    padding : '5px 0',
    boxShadow : '0 0 3px #eee'
}


interface IProps {
    todo: StateProps;
    changeTodo: (id: number) => void;
}

const TodoItem = ({todo, changeTodo}: IProps) => {
    const changHandler = () => {
        changeTodo(todo.id);
    }

    const spanStyle = {
        boxShadow : '0 0 3px black',
        textDecoration : todo.finished == 1? 'line-through': 'none'
    }


    return (
        <div className="todo_item" style={ style } >
            <input type="checkbox" checked = {todo.finished == 1} onChange={changHandler} />
            <span  style={ spanStyle } >{todo.text}</span>
        </div>
    )
}
export default TodoItem;