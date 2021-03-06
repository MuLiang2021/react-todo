import React, {useState} from 'react';
import {Todo, Warning} from '../common/common';
import {deleteStyle, ordinaryStyle, TodoAdd, WholeDiv, inputTextStyle} from '../css/css';
import {fetchGet, fetchDel, fetchPostAndPut} from "../util/fetchUtil";
import {TODOS_URL} from "../common/constant";
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
        fetchGet(TODOS_URL).then(
                function (response) {
                    response.json().then(function (data) {
                        setToDoList(data)
                    });
                }
            ).catch(console.error)
    }, []);

    const changHandler = (item: Todo) => {
        let body: string = qs.stringify({
            finished: item.finished == 0 ? 1:0
        });
        fetchPostAndPut(TODOS_URL + "/" +item.id,"put", body).then(
            function () {
                const updatedTodo = {
                    id: item.id,
                    text: item.text,
                    finished: item.finished == 0 ? 1:0
                };
                const updatedToDoList = toDoList.map((todo) => (todo.id === item.id ? updatedTodo : todo ));
                setToDoList(updatedToDoList);
            }
        ).catch(console.error)
    };



    const deleteHandler = (item: Todo) => {
        if (window.confirm('Do you want to delete this text?')) {
            fetchDel(TODOS_URL + "/" + item.id).then(
                function (response) {
                    response.text().then(function (data) {
                        const updatedToDoList = toDoList.filter((i) => i.id != item.id)
                        setToDoList(updatedToDoList);
                    });
                }
            ).catch(console.error)
        }
    };

    const changeTextHandler = (e:React.ChangeEvent) => {
        setText((e.target as HTMLInputElement).value)
    };

    const validateGroup = (text: string): Warning => {
        if(text.trim() === ''){
            return {warning: true, warningText: 'can not be empty'};
        }
        const existText = toDoList.filter((item: Todo) =>{
            return item.text.trim() === text.trim();
        })
        if(existText.length){
            return {warning: true, warningText: 'duplicate text'};
        }
        return  {warning: false, warningText: ''};
    }


    const addTodoHandler = () => {
        const validateResult = validateGroup(text);
        if(validateResult.warning){
            alert(validateResult.warningText);
            return;
        }
        let body:string = qs.stringify({
            text:text
        });
        fetchPostAndPut(TODOS_URL,"post", body).then(
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
        ).catch(console.error);
        setText('');
    };

    return (
        <WholeDiv>
            <TodoAdd>
                <TextField placeholder="What needs to be done" size="small"  style={inputTextStyle} onChange={changeTextHandler} value={text} />
                <Button onClick={addTodoHandler} color = 'inherit' variant="outlined">ADD</Button>
            </TodoAdd>
            <TableContainer sx={{ width: 700, margin: "0 auto" }}>
                <Table  aria-label="simple table">
                    <TableBody>
                    {toDoList.map((item, index) =>
                        <TableRow key = {index}>
                            <TableCell  sx={{ padding: "10px" }}>
                                <Checkbox size="small" data-testid="checkboxItem" color="default" checked = {item.finished == 1} onChange={ () => changHandler(item)} />
                                <span style={item.finished == 1? deleteStyle : ordinaryStyle} >{item.text}</span>
                                <Button  color = 'inherit' sx={{minWidth: 30,float: 'right'}} variant="outlined" onClick={ () => deleteHandler(item)}>DELETE</Button>
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </WholeDiv>
    );
};
export default TodoList;
