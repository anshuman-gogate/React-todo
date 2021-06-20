import React from 'react'
import Todo from "./Todo.js"

function TodoList(props) {

    const todosArr = props.todos.map(todo => {
        return (
            <Todo 
                item = {todo} 
                handleChange = {props.handleChange} 
                handleCheck = {props.handleCheck} 
                key = {todo.key} 
                handleDelete = {props.handleDelete}
            />
        );
    });

    return (
        <div className= "todo--list">
           {todosArr}
        </div>
    )
}

export default TodoList
