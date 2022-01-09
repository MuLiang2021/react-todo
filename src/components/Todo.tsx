import React,{useState} from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import qs from "querystring";

export interface StateProps {
    id: number;
    text: string;
    finished: number;
    
}

const Todo = () => {
    const [toDoList, setToDoList] = useState<StateProps[]>([]);

    React.useEffect(() => {
        console.log("init")
        refresh();
    }, [])

    const refresh = () => {
        fetch("http://127.0.0.1:8080/todo/todos")
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log("error：" + response.status)
                        alert("service error")
                        return;
                    }
                    response.json().then(function (data) {
                            setToDoList(data)
                            console.log(data)
                    });
                }
            ).catch(function (err) {
            console.log("refresh error:" + err)
        })
    }

    const changeTodo = (id: number) => {
        fetch('http://127.0.0.1:8080/todo/todo', {
            method: 'put',
            headers: {
                'Accept': 'application/json,text/plain,*/*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify({
                id: id,
                text: "",
                finished: 0
            })
        }).then(
            function (response) {
                if (response.status !== 200) {
                    console.log("error：" + response.status)
                    alert("service error")
                    return;
                }
                 refresh()
            }
        ).catch(function (err) {
            console.log("changeTodo error:" + err)
        })
    }


    // const changeTodo = (id: number) =>{
    //     const newTodoList = toDoList.map(item => {
    //         if(id == item.id){
    //              return Object.assign({}, item, {
    //                 finish: !item.finish
    //             });
    //         }
    //         return item;
    //     })
    //     setToDoList(newTodoList);
    // }

    // const addTodo = (todo: StateProps) =>{
    //     setToDoList([...toDoList, todo]);
    // }
    return (
        <div className="todo" >
            <TodoInput refresh = {refresh}/>
            <TodoList toDoList = {toDoList} changeTodo = {changeTodo}/>
        </div>
    )
}
export default Todo;