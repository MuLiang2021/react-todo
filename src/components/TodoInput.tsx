import React,{useState} from 'react';
import qs from 'querystring';

interface IProps {
    refresh: () => void;
}

const TodoInput = ({refresh}: IProps) => {
    const [text, setText] = useState('');

    const changeTextHandler = (e:React.ChangeEvent) => {
        setText((e.target as HTMLInputElement).value)
    }

    const addTodoHandler = () => {

        fetch('http://127.0.0.1:8080/todo/todo',{
            method:'post',
            headers:{
                'Accept':'application/json,text/plain,*/*',
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:qs.stringify({
                id:0,
                text:text,
                finished:0
            })
        }).then(
            function (response) {
                if (response.status !== 200) {
                    console.log("error：" + response.status)
                    alert("service error")
                    return;
                }
                response.text().then(function (data) {
                    alert(data)
                    refresh()
                });

            }
        ).catch(function (err) {
            console.log("addTodo error:" + err)
        })
        setText('')


        //     .then((response)=>{
        //     return response.json()
        // }).then((data)=>{
        //     console.log(data)
        // })
    }

    /*const addTodoHandler = () => {
        console.log(text);
        addTodo({
            id: new Date().getTime(),
            text: text,
            finished: 0
        });
        setText('');
    }*/



    return (
        <div className="todo_input" >
            <input type="text" placeholder="What needs to be done"  onChange={changeTextHandler} value={text}/>
            <button onClick={addTodoHandler} >add</button>
        </div>
    )
}
export default TodoInput;