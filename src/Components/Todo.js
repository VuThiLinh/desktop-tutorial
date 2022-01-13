import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList"
import styles from './scss/Todo.module.scss'

function Todo() {
    const navigate = useNavigate();
    const [input, setInput] = useState('')
    const [todoList, setTodoList] = useState([]);
    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setInput('')
        console.log(input);
        setTodoList([...todoList,input]);
    }

    const handleLogout = () =>{
        localStorage.removeItem("token");
        navigate("/");
    }
    
    return (
        <>  
            <button className={styles.btnLog} onClick={handleLogout}>Logout</button>
            <div className={styles.content}>
                <h1 className={styles.heading}>Site Todo</h1>
                <form className={styles.addTodo} onSubmit={handleSubmit}>
                    <input className={styles.todoInput} type="text" placeholder="Add todo" value={input} onChange={handleChange}/>
                    <button className={styles.addBtn}>Add</button>
                </form>
                <TodoList list={todoList} setState={setTodoList}/>
            </div>
        </>
    )
}

export default Todo