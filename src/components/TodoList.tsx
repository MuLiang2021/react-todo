import React from 'react';
import TodoItem from "./TodoItem";
import {StateProps} from "./Todo";

const style = {
    marginTop : '20px'
}
interface IProps {
    toDoList: StateProps[];
    changeTodo: (id: number) => void;
}
const TodoList = ({toDoList, changeTodo}: IProps) => {
    const todoListdom = toDoList.map(item =>  <TodoItem key = {item.id} todo = {item} changeTodo={changeTodo}/>)

    return (
        <div className="todo_list" style={style} >
            {todoListdom}
        </div>

    )
}
export default TodoList;