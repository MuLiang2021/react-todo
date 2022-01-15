import React, {useState} from 'react';
import {Todo} from '../common/common';
import {deleteStyle, ordinaryStyle, TodoAdd, WholeDiv, inputTextStyle} from "../css/css";
import qs from "querystring";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';




const TodoList = () => {

    const [toDoList, setToDoList] = useState<Todo[]>([]);
    const [text, setText] = useState('');

    React.useEffect(() => {
        console.log('fetch todoList');
        fetch("http://127.0.0.1:8080/todo")
            .then(
                function (response) {
                    response.json().then(function (data) {
                        setToDoList(data)
                    });
                }
            ).catch(console.error)
    }, []);

    const changHandler = (item: Todo) => {
        fetch('http://127.0.0.1:8080/todo/'+item.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json,text/plain,*/*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify({
                finished: item.finished == 0 ? 1:0
            })
        }).then(
            function (response) {
                const updatedTodo = {
                    id: item.id,
                    text: item.text,
                    finished: item.finished == 0 ? 1:0
                };
                const updatedToDoList = toDoList.map((todo) => (todo.id === item.id ? updatedTodo : todo ));
                setToDoList(updatedToDoList);
            }
        ).catch(function (err) {
            console.log("changeTodo error:" + err)
        })
    };
    const changeTextHandler = (e:React.ChangeEvent) => {
        setText((e.target as HTMLInputElement).value)
    };

    const addTodoHandler = () => {
        fetch('http://127.0.0.1:8080/todo',{
            method:'post',
            headers:{
                'Accept':'application/json,text/plain,*/*',
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:qs.stringify({
                text:text
            })
        }).then(
            function (response) {
                response.text().then(function (data) {
                    const newTodo = {
                        id: Number(data),
                        text: text,
                        finished: 0
                    };
                    setToDoList([...toDoList, newTodo]);
                });
            }
        ).catch(console.error)
        setText('')

    }

    return (
        <WholeDiv>
            <TodoAdd>
                <TextField placeholder="What needs to be done" size="small" style={inputTextStyle} onChange={changeTextHandler} value={text} />
                <Button onClick={addTodoHandler} variant="outlined">add</Button>
            </TodoAdd>
            <TableContainer sx={{ width: 500, margin: "0 auto" }}>
                <Table  aria-label="simple table">
                    <TableBody>
                    {toDoList.map((item, index) =>
                        <TableRow key = {index}>
                            <TableCell  sx={{ padding: "10px" }}>
                                <Checkbox size="small"  checked = {item.finished == 1} onChange={ () => changHandler(item)} />
                                <span style={item.finished == 1? deleteStyle : ordinaryStyle} >{item.text}</span>
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </WholeDiv>

    );
}
export default TodoList;