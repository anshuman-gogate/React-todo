import React from "react";
import TodoList from "./TodoList.js"

class Form extends React.Component{
    constructor() {
        super();
        this.state = {
            tfData: "",
            todos: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteALL = this.handleDeleteALL.bind(this);
        this.saveLocalTodos = this.saveLocalTodos.bind(this);
    }

    componentDidMount() {
        let Prevtodos;
        if(localStorage.getItem('todos') === null) {
            Prevtodos = [];
        }
        else {
            Prevtodos = JSON.parse(localStorage.getItem('todos'));
        }

        this.setState({todos: Prevtodos})
    }

    componentDidUpdate(prevProps , prevState) {
        if(prevState !== this.state)
        {
            let localItem = [];
            localItem = this.state.todos;
            this.saveLocalTodos(localItem);
        }
    }

    handleChange(event) {
        const {name, value } = event.target;
        this.setState(prevState => {
            return {
                [name] : value
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.tfData !== " " && this.state.tfData !== "" && this.state.tfData !== "  ")
        {
            this.setState(prevState => {
                const todo = {
                    value: prevState.tfData,
                    checked: false,
                    key: Math.random()*100000
                }
                return (
                    {
                        todos: [...prevState.todos , todo],
                        tfData: ""
                    }
                );
            })
        }
        else {
            this.setState({tfData: ""});
        }
    }

    handleCheck(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if(todo.key === id) {
                   return {
                        ...todo ,
                        checked: !todo.checked
                    }
                }
                return todo;
            })
            return {
                todos: updatedTodos
            }
        });
    }

    handleDelete(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.filter(todo => {
                return todo.key !== id;
            })
            return {
                todos: updatedTodos
            }
        })
    }

    handleDeleteALL() {
        this.setState({todos: []});
        localStorage.clear();
    }

    // Testing a local storage function below
    saveLocalTodos(todo) {
        // check below to check if states already exist in the local storage.
        let todos;
        if(localStorage.getItem('todos') === null) {
            todos = [];
        }
        else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos = todo;
        localStorage.setItem("todos" , JSON.stringify(todos));
    }

    render() {
        return (
            <div className = "form--container">
                <form onSubmit= {this.handleSubmit} className="input-form">
                    <input 
                        type= "text" 
                        name="tfData" 
                        onChange= {this.handleChange} 
                        value={this.state.tfData}
                        placeholder="Add a new todo"
                    />
                    <button ><i className="fa fa-plus"></i></button>
                </form>
                <TodoList 
                    todos = {this.state.todos} 
                    handleChange = {this.handleChange} 
                    handleCheck = {this.handleCheck}
                    handleDelete = {this.handleDelete}
                />
                <button className="clearall-btn" onClick = {this.handleDeleteALL}>Clear All</button>
            </div>
        );
    }
}

export default Form;